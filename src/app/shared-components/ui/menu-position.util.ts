export interface MenuPosition {
  top: string;
  left: string;
}

/**
 * Calcula la posición top/left del menú desplegable, ajustando si se desborda a la derecha.
 * @param event Evento MouseEvent desde el botón que abre el menú
 * @param menuWidth Ancho estimado del menú (en px)
 * @param offsetY Separación vertical del botón (en px)
 * @returns Objeto { top, left } como strings en px
 */
export function getDropdownPosition(
  event: MouseEvent,
  menuWidth = 160,
  offsetY = 8,
): MenuPosition {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const scrollY = window.scrollY;

  const left =
    rect.left + menuWidth > window.innerWidth
      ? rect.right - menuWidth
      : rect.left;

  return {
    top: `${rect.bottom + offsetY + scrollY}px`,
    left: `${left}px`,
  };
}
