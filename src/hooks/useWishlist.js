import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useSelector } from "react-redux";
import {
  getWishlist,
  saveWishlist,
} from "../services/wishlistApi";

function useWishlist() {
  const queryClient = useQueryClient();

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const userId = user?.id;
  const queryKey = ["wishlist", userId];

  // Fetch wishlist
  const {
    data: wishlistItems = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getWishlist(userId),
    enabled: Boolean(isAuthenticated && userId),
  });

  // Save wishlist changes
  const wishlistMutation = useMutation({
    mutationFn: (items) => saveWishlist(userId, items),

    onMutate: async (newItems) => {
      await queryClient.cancelQueries({ queryKey });

      const previousItems = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, newItems);

      return { previousItems };
    },

    onError: (_error, _newItems, context) => {
      if (context?.previousItems !== undefined) {
        queryClient.setQueryData(
          queryKey,
          context.previousItems
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  // Update wishlist
  const updateWishlist = (updater) => {
    const currentItems =
      queryClient.getQueryData(queryKey) || [];

    const updatedItems = updater(currentItems);

    wishlistMutation.mutate(updatedItems);
  };

  // Add product
  const addToWishlist = (product) => {
    updateWishlist((items) => {
      const alreadyExists = items.some(
        (item) => String(item.id) === String(product.id)
      );

      if (alreadyExists) return items;

      return [...items, product];
    });
  };

  // Remove product
  const removeFromWishlist = (productId) => {
    updateWishlist((items) =>
      items.filter(
        (item) => String(item.id) !== String(productId)
      )
    );
  };

  // Clear wishlist
  const clearWishlist = () => wishlistMutation.mutateAsync([]);

  return {
    wishlistItems,
    isLoading,
    isError,
    error,
    isSaving: wishlistMutation.isPending,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  };
}

export default useWishlist;