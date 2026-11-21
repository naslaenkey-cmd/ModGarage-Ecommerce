
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getCart, saveCart } from "../services/cartApi";

function useCart() {
  const queryClient = useQueryClient();

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const userId = user?.id;
  const queryKey = ["cart", userId];

  // Fetch cart from JSON Server
  const {
    data: cartItems = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getCart(userId),
    enabled: Boolean(isAuthenticated && userId),
  });

  // Save cart changes
  const cartMutation = useMutation({
    mutationFn: (items) => saveCart(userId, items),

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

  // Update cart using the latest cached items
  const updateCart = (updater) => {
    const currentItems =
      queryClient.getQueryData(queryKey) || [];

    const updatedItems = updater(currentItems);

    cartMutation.mutate(updatedItems);
  };

  // Add product
  const addToCart = (product) => {
    updateCart((items) => {
      const selectedQuantity = product.quantity || 1;

      const existingItem = items.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        return items.map((item) =>
          String(item.id) === String(product.id)
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + selectedQuantity,
                  item.stock
                ),
              }
            : item
        );
      }

      const quantityToAdd = Math.min(
        selectedQuantity,
        product.stock
      );

      if (quantityToAdd <= 0) return items;

      return [
        ...items,
        {
          ...product,
          quantity: quantityToAdd,
        },
      ];
    });
  };

  // Remove product
  const removeFromCart = (productId) => {
    updateCart((items) =>
      items.filter(
        (item) => String(item.id) !== String(productId)
      )
    );
  };

  // Increase quantity
  const increaseQuantity = (productId) => {
    updateCart((items) =>
      items.map((item) =>
        String(item.id) === String(productId) &&
        item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    updateCart((items) =>
      items.map((item) =>
        String(item.id) === String(productId) &&
        item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Clear cart after successful order
  const clearCart = () => {
    updateCart(() => []);
  };

  return {
    cartItems,
    isLoading,
    isError,
    error,
    isSaving: cartMutation.isPending,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
}

export default useCart;
