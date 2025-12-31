import type { CarouselApi } from "@/components/ui/carousel";
import { useCallback, useState } from "react";

export function useFunctionalCarousel() {
  const [api, setApi] = useState<CarouselApi>();

  const disableScroll = useCallback(
    () => api?.internalEngine().dragHandler.destroy(),
    [api]
  );
  const enableScroll = useCallback(
    () => api?.internalEngine().dragHandler.init(api),
    [api]
  );

  return { setApi, disableScroll, enableScroll };
}
