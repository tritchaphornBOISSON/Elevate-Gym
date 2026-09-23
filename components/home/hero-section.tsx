import { ActionLink } from "@/components/ui/action-link";
import { EditorialImage } from "@/components/ui/editorial-image";
import { heroConceptImage } from "@/content/site";

export function HeroSection() {
  return (
    <section
      aria-labelledby="home-heading"
      className="relative min-h-[38rem] overflow-hidden bg-charcoal lg:min-h-[44rem]"
    >
      <div className="absolute inset-0">
        <EditorialImage
          alt={heroConceptImage.alt}
          className="h-full w-full"
          objectPosition={heroConceptImage.objectPosition}
          preload
          sizes="100vw"
          src={heroConceptImage.src}
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_20%,rgb(16_23_24/0.18)_48%,rgb(16_23_24/0.96)_100%)] lg:bg-[linear-gradient(to_right,rgb(16_23_24/0.04)_0%,rgb(16_23_24/0.12)_42%,rgb(16_23_24/0.82)_70%,rgb(16_23_24/0.97)_100%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[38rem] w-full max-w-[96rem] items-end px-4 pb-8 sm:px-8 sm:pb-10 lg:min-h-[44rem] lg:items-center lg:px-12 lg:pt-20 lg:pb-12 xl:px-16">
        <div className="w-full lg:ml-auto lg:w-1/2 lg:pl-12 xl:pl-16">
          <div className="w-full lg:max-w-[40rem]">
            <h1
              id="home-heading"
              className="text-shadow-image font-display leading-[0.86] font-semibold tracking-[-0.035em] text-white uppercase"
            >
              <span className="block text-[clamp(3rem,12vw,4.5rem)] lg:text-[clamp(4.25rem,5.6vw,6rem)]">
                TRAIN.
              </span>
              <span className="block text-[clamp(3rem,12vw,4.5rem)] lg:text-[clamp(4.25rem,5.6vw,6rem)]">
                PROGRESS.
              </span>
              <span className="block font-accent text-[clamp(4.25rem,17vw,5.5rem)] leading-[0.78] font-medium text-accent normal-case italic lg:text-[clamp(5rem,6.2vw,6rem)]">
                Elevate.
              </span>
            </h1>

            <p className="text-shadow-image mt-5 max-w-xl font-accent text-lg leading-6 text-white sm:text-xl sm:leading-7">
              A premium destination gym built for real training, meaningful
              progress and a stronger you.
            </p>

            <div className="mt-6 grid w-full grid-cols-2 gap-1 sm:max-w-xl sm:gap-3 lg:max-w-lg">
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
