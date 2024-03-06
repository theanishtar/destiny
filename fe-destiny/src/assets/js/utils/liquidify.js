import { app } from "./app.js";

export const liquid = {
  liquid: function () {
    app.querySelector(".liquid", function (images) {
      for (const image of images) {
        app.liquidify(image);
      }
    });
  },
};
