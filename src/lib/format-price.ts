/**
 * USD price formatting.
 *
 * Admin now sends exact figures (annualTotal 623.04, annualPricePerMonth 51.92)
 * rather than rounded ones, so displayed prices must keep their cents. A price
 * shown as $624 against a $623.04 charge is a dispute waiting to happen.
 *
 * Whole numbers render without decimals ($59, not $59.00) and anything with
 * cents renders with exactly two ($623.04, $623.10 — never $623.1).
 */
export function formatUsd(amount: number): string {
  const hasCents = !Number.isInteger(amount);
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  });
}
