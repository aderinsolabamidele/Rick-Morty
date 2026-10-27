// Shared "portal energy" level (0..1), set by the CTA/Earth hover, read inside animation loops.
const energy = { target: 0 };
export const setEnergy = (t) => { energy.target = t; };
export const getEnergyTarget = () => energy.target;

// Short "portal activation" burst (click on the portal), decays after ~1.6s.
const activation = { until: 0, duration: 1600 };
export const triggerActivation = () => { activation.until = performance.now() + activation.duration; };
export const isActivating = () => performance.now() < activation.until;