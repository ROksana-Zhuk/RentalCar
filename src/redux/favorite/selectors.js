export const selectFavorites = (state) => state.favorites.items;

export const selectIsFavorite = (state, carId) =>
  state.favorites.items.some((car) => car.id === carId);
