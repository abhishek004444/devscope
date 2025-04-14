import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getProperties, 
  getProperty, 
  createProperty, 
  updateProperty, 
  deleteProperty 
} from '../api/propertyApi';

// export const useProperties = (filters = {}, sortOption = 'price-asc') => {
//   return useQuery({
//     queryKey: ['properties', filters, sortOption],
//     queryFn: () => getProperties(),
//     select: (data) => {
//       // Apply filters and sorting
//       let filteredData = [...data];
      
      // if (filters.minPrice) {
      //   filteredData = filteredData.filter(p => p.price >= filters.minPrice);
      // }
      
      // if (filters.maxPrice) {
      //   filteredData = filteredData.filter(p => p.price <= filters.maxPrice);
      // }
      
      // if (filters.bedrooms) {
      //   filteredData = filteredData.filter(p => p.bedrooms >= filters.bedrooms);
      // }
      
      // if (filters.location) {
      //   filteredData = filteredData.filter(p => 
      //     p.location.toLowerCase().includes(filters.location.toLowerCase())
      //   );
      // }
      
      // Apply sorting
      // switch (sortOption) {
      //   case 'price-asc':
      //     return filteredData.sort((a, b) => a.price - b.price);
      //   case 'price-desc':
      //     return filteredData.sort((a, b) => b.price - a.price);
      //   case 'newest':
      //     return filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      //   default:
      //     return filteredData;
      // }
//     }
//   });
// };

export const useProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: getProperties
  });
};

export const useProperty = (id) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => getProperty(id),
    enabled: !!id
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries(['properties']);
    }
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateProperty,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['properties']);
      queryClient.setQueryData(['property', data._id], data);
    }
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProperty,
    onSuccess: (_, id) => { // Change parameter order to (data, variables, context)
      // Optimistically remove the property from the list
      queryClient.setQueryData(['properties'], (old) => 
        old.filter(property => property._id !== id)
      );
      
      // Remove any cached data for this specific property
      queryClient.removeQueries(['property', id]);
    },
    onError: (error, id, context) => {
      // If error occurs, revert back to the previous state
      queryClient.setQueryData(['properties'], context.previousProperties);
    },
    onMutate: async (id) => {
      // Cancel any outgoing refetches to avoid overwriting
      await queryClient.cancelQueries(['properties']);
      
      // Snapshot the previous value
      const previousProperties = queryClient.getQueryData(['properties']);
      
      // Return the context for error handling
      return { previousProperties };
    },
    onSettled: () => {
      // Always refetch after error or success to ensure sync with server
      queryClient.invalidateQueries(['properties']);
    }
  });
};