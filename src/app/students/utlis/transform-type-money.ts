export function TransformarDeuda(deuda: any) {
  const valorTransformado = parseFloat(deuda.replace(/[^\d.-]/g, ''));

  return valorTransformado;
}
