import { Position, Toaster } from "@blueprintjs/core";

export const GlobalToaster = Toaster.create({
  autoFocus: false,
  canEscapeKeyClear: true,
  maxToasts: 5,
  position: Position.TOP,
});
