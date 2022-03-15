
export function failRoute(req, res) {
    const title = 'ROUTING ERROR';
    const { url, method } = req
    logger.warn(`Ruta ${method} ${url} inexistente`)
    res.status(404).json( { titulo: title });
  }