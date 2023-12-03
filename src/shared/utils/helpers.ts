export const handleScroll = (
  ref: React.RefObject<HTMLInputElement>,
  otherRef: React.RefObject<HTMLInputElement>,
) => () => {
  const scrollTop = ref?.current?.scrollTop || 0;
  const otherRefCurrent = otherRef.current;

  if (otherRefCurrent) {
    otherRefCurrent.scrollTop = scrollTop;
  }
};