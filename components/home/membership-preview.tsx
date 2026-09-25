import { ActionLink } from "@/components/ui/action-link";
import {
  formatPriceThb,
  membershipPasses,
} from "@/content/memberships";

const dividerClasses = [
  "",
  "lg:border-l lg:border-charcoal/15",
  "lg:border-l lg:border-charcoal/15",
  "lg:border-l lg:border-charcoal/15",
] as const;

export function MembershipPreview() {
  return (
    <section
      id="membership"
      aria-labelledby="membership-heading"
      className="membership-ribbon relative z-10 bg-cream px-4 pt-8 pb-8 text-charcoal sm:px-8 lg:px-12 lg:pt-10 lg:pb-10"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[80rem] flex-col items-center">
        <span aria-hidden="true" className="mb-4 h-px w-12 bg-accent" />

        <h2
          id="membership-heading"
          className="homepage-section-title text-center font-display font-semibold tracking-[-0.035em] uppercase lg:whitespace-nowrap"
        >
          <span>MEMBERSHIPS</span>{" "}
          <span className="block whitespace-nowrap lg:inline">
            <span>THAT FIT</span>{" "}
            <span className="font-accent font-medium tracking-[-0.025em] text-accent italic">
              YOUR STAY
            </span>
          </span>
        </h2>

        <p className="mt-3 max-w-[34rem] text-center font-accent text-lg leading-6 font-medium sm:text-xl sm:leading-7">
          Flexible access for a day, a week or a longer commitment.
        </p>

        <dl className="membership-price-grid relative mt-8 grid w-full grid-cols-2 gap-y-8 before:pointer-events-none before:absolute before:inset-y-0 before:left-1/2 before:z-10 before:w-px before:-translate-x-1/2 before:bg-charcoal/15 before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:top-1/2 after:z-10 after:h-px after:-translate-y-1/2 after:bg-charcoal/15 after:content-[''] lg:grid-cols-4 lg:gap-y-0 lg:before:hidden lg:after:hidden">
          {membershipPasses.map((membershipPass, index) => {
            const [amount, currency] = formatPriceThb(
              membershipPass.priceThb,
            ).split(" ");

            return (
              <div
                className={`flex min-h-24 flex-col items-center justify-center px-2 py-2 text-center sm:min-h-28 sm:px-4 lg:min-h-32 lg:py-5 ${dividerClasses[index]}`}
                key={membershipPass.id}
              >
                <dt className="font-display text-xs font-semibold tracking-[0.18em] uppercase">
                  {membershipPass.label}
                </dt>
                <dd className="mt-2 flex items-baseline justify-center gap-1 font-accent leading-none tabular-nums">
                  <span className="text-[clamp(2.25rem,10vw,3.25rem)] font-medium tracking-[-0.035em] lg:text-[2.875rem]">
                    {amount}
                  </span>
                  <span className="font-display text-xs font-semibold uppercase">
                    {currency}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-8 lg:mt-10">
          <ActionLink href="#membership" variant="dark">
            View memberships
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
