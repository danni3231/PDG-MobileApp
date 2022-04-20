import { useLayoutEffect } from "react";

export const lineBreak = (text: string) => {
  return text.split("\\n");
};

export const parseHour = (date: number) => {
  const dateParser = new Date(date * 1000);
  return `${dateParser.getHours()}:${dateParser.getMinutes()}`;
};

export const goBack = (navigate: any) => {
  navigate(-1);
};

export const getTimeStamp = (date: Date) => {
  return parseInt((date.getTime() / 1000).toFixed(0));
};

export const useOnClickOutside = (ref: any, handler: Function) => {
  useLayoutEffect(
    () => {
      const listener = (event: Event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
};

export const castCondominiumId = (condominium: string) => {
  switch (condominium) {
    case "Guadalupe alto":
      return "q4CPmR9IIHrA6k1H2SdS";

    case "El Coral":
      return "DUw9HqlhTXeYWW6BtAJN";

    case "Boho u living":
      return "kPDi38bfklEI4P9MWRMS";

    default:
      return "";
  }
};

export const updatedViewport = ()=>{
  let viewport = document.querySelector('meta[name=viewport]') as HTMLMetaElement
  viewport.setAttribute('content', `width=device-width, height=${window.innerHeight}, initial-scale=1`)
}
