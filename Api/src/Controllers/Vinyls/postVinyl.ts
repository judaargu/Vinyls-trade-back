import { Vinyl } from "../../Models/Vinyls";

export const postVinyl = async (body: Vinyl) => {
  const { artist, title, year, genre, cover_image, style, price } = body;

  try {
    if ( !artist || !title || !year || !genre || !cover_image || !style || !price) {
      return { status: 404, json: "Faltan datos" };
    }

    await Vinyl.findOrCreate({
      where: { title },
      defaults: { artist, title, year, genre, cover_image, style, price },
    });

    const vinyls = await Vinyl.findAll();
    return { status: 200, json: vinyls };
  } catch (error) {
    return { status: 500, json: error };
  }
};
