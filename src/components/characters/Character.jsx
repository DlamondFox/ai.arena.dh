import { useMemo } from 'react';

const Character = ({
  src,
  x,
  y,
  tileSize = 64,
  centerOffsetX = 0.5,
  centerOffsetY = 0.5,
  direction = 'right',
  cycleSeconds = 1.2,
  frames,
  frameW,
  frameH,
  moveMs = 0,
  opacity = 1,
  fadeMs = 0,
}) => {
  const safeFrames = useMemo(() => Math.max(1, Math.floor(frames || 1)), [frames]);
  const safeFrameW = useMemo(() => Math.max(1, Math.floor(frameW || tileSize)), [frameW, tileSize]);
  const safeFrameH = useMemo(() => Math.max(1, Math.floor(frameH || tileSize)), [frameH, tileSize]);
  const safeCycleSeconds = useMemo(() => Math.max(0.1, Number(cycleSeconds) || 1.2), [cycleSeconds]);

  const safeCenterOffsetX = useMemo(() => Number(centerOffsetX) || 0.5, [centerOffsetX]);
  const safeCenterOffsetY = useMemo(() => Number(centerOffsetY) || 0.5, [centerOffsetY]);

  const leftPos = Math.round((x + safeCenterOffsetX) * tileSize - safeFrameW / 2);
  const topPos = Math.round((y + safeCenterOffsetY) * tileSize - safeFrameH / 2);
  const zIndexVal = y;

  const safeMoveMs = useMemo(() => Math.max(0, Math.trunc(moveMs || 0)), [moveMs]);
  const safeFadeMs = useMemo(() => Math.max(0, Math.trunc(fadeMs || 0)), [fadeMs]);
  const safeOpacity = useMemo(() => {
    const v = Number(opacity);
    if (!Number.isFinite(v)) return 1;
    return Math.max(0, Math.min(1, v));
  }, [opacity]);

  const transitionProps = useMemo(() => {
    const props = [];
    if (safeMoveMs > 0) props.push('left', 'top');
    if (safeFadeMs > 0) props.push('opacity');
    return props;
  }, [safeFadeMs, safeMoveMs]);

  const transitionDurations = useMemo(() => {
    const durations = [];
    if (safeMoveMs > 0) durations.push(`${safeMoveMs}ms`, `${safeMoveMs}ms`);
    if (safeFadeMs > 0) durations.push(`${safeFadeMs}ms`);
    return durations;
  }, [safeFadeMs, safeMoveMs]);

  const containerStyle = {
    left: `${leftPos}px`,
    top: `${topPos}px`,
    zIndex: zIndexVal,
    width: `${safeFrameW}px`,
    height: `${safeFrameH}px`,
    opacity: safeOpacity,
    overflow: 'hidden',
    position: 'absolute',
    imageRendering: 'pixelated',
    transform: direction === 'left' ? 'scaleX(-1)' : 'none',
    transformOrigin: 'center bottom',

    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0px 0px',
    backgroundSize: `${safeFrameW * safeFrames}px ${safeFrameH}px`,

    animationName: safeFrames > 1 ? 'sprite-bg' : 'none',
    animationDuration: `${safeCycleSeconds}s`,
    animationTimingFunction: `steps(${safeFrames})`,
    animationIterationCount: 'infinite',

    transitionProperty: transitionProps.length ? transitionProps.join(', ') : 'none',
    transitionDuration: transitionDurations.length ? transitionDurations.join(', ') : '0ms',
    transitionTimingFunction: 'linear',

    // Used by CSS keyframes in index.css
    ['--sheetShift']: `${safeFrameW * safeFrames}px`,
  };

  return (
    <div className="character-sprite" style={containerStyle} />
  );
};

export default Character;