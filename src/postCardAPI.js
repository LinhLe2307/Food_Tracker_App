export const postCardAPI = () => {
  API.post("LinhLe", {
    fields: {
      carb: {
        integerValue: carb.value,
      },
      fat: {
        integerValue: fat.value,
      },
      protein: {
        integerValue: protein.value,
      },
      name: {
        stringValue: foodName.value,
      },
    },
  });
};
