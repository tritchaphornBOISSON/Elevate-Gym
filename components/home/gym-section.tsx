import { GymCarousel } from "@/components/home/gym-carousel";
import { ActionLink } from "@/components/ui/action-link";
import { gymSlides } from "@/content/site";

export function GymSection() {
  return (
    <section
      aria-labelledby="gym-heading"
      className="overflow-hidden bg-charcoal px-4 py-8 sm:px-8 sm:py-14 lg:px-12 lg:py-20"
      id="gym"
    >
      <div className="mx-auto grid w-full max-w-[96rem] gap-8 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-12 xl:gap-20">
        <div className="max-w-md lg:pl-2 xl:pl-8">
          <div className="mb-4 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-accent"
            />
            <p className="font-display text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              THE GYM
            </p>
          </div>

          <h2
            className="font-display text-[2rem] leading-[0.92] font-semibold tracking-[-0.035em] text-white uppercase min-[360px]:text-4xl sm:text-5xl lg:text-5xl xl:text-6xl"
            id="gym-heading"
          >
            <span className="block whitespace-nowrap">
              BUILT FOR{" "}
              <span className="font-accent text-[1.18em] leading-none font-medium text-accent italic">
                REAL
              </span>
            </span>
            <span className="block">TRAINING</span>
          </h2>

          <p className="mt-4 max-w-sm font-accent text-lg leading-6 text-white/90 sm:text-xl sm:leading-7">
            A complete training environment designed for strength, movement and
            meaningful progress.
          </p>

          <div className="mt-5">
            <ActionLink href="#gym" variant="text">
              DISCOVER THE GYM
            </ActionLink>
          </div>
        </div>

        <GymCarousel slides={gymSlides} />
      </div>
    </section>
  );
}
