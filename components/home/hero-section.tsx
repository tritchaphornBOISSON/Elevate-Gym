import { ActionLink } from "@/components/ui/action-link";
import { EditorialImage } from "@/components/ui/editorial-image";

export function HeroSection() {
  return (
    <section
      aria-labelledby="home-heading"
      className="relative min-h-[38rem] overflow-hidden bg-charcoal lg:min-h-[44rem]"
    >
      <div className="relative mx-auto grid min-h-[38rem] w-full max-w-[96rem] lg:min-h-[44rem] lg:grid-cols-2">
        <div className="image-scrim-bottom relative min-h-[38rem] lg:min-h-[44rem]">
          <div className="absolute inset-0">
            <EditorialImage
              src={null}
              alt={null}
              concept
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end px-4 pb-8 sm:px-8 sm:pb-10 lg:static lg:justify-center lg:bg-charcoal lg:px-12 lg:pt-20 lg:pb-12 xl:px-16">
          <div className="w-full lg:max-w-xl">
            <h1
              id="home-heading"
              className="text-shadow-image font-display text-5xl leading-[0.88] font-semibold tracking-[-0.035em] text-white uppercase sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              <span className="block">Elevate</span>
              <span className="block font-accent font-medium text-peach normal-case italic">
                Gym
              </span>
            </h1>

            <div className="mt-8 grid w-full grid-cols-2 gap-1 sm:max-w-xl sm:gap-3 lg:max-w-lg">
              <ActionLink href="#membership" variant="light">
                View memberships
              </ActionLink>
              <ActionLink href="#gym" variant="outline">
                Explore the gym
              </ActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
