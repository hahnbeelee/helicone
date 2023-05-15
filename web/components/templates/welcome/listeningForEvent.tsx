import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import Lottie from "react-lottie";
import { Result } from "../../../lib/result";
import * as PartyParrot from "../../../public/lottie/PartyParrot.json";
import * as Listening from "../../../public/lottie/Listening.json";

interface ListeningForEventProps {}

const ListeningForEvent = (props: ListeningForEventProps) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["hasOnboarded"],
    queryFn: async () => {
      if (data?.data || (data?.data ?? null) == null) {
        setTimeElapsed((prev) => prev + 3);
        return await fetch("/api/user/checkOnboarded", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json() as Promise<Result<boolean, string>>);
      }
    },
    refetchOnWindowFocus: false,
    refetchInterval: 3000,
  });

  if (data?.data || (data?.data ?? null) === null) {
    return (
      <div className="flex flex-col space-y-4 items-center py-16 text-gray-900">
        <div className="text-2xl">Listening for events</div>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: Listening,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={100}
          width={100}
          isStopped={false}
          isPaused={false}
          style={{
            pointerEvents: "none",
            background: "transparent",
          }}
        />
        <p>Once we receive your first event you can visit your dashboard</p>
        {timeElapsed > 60 && (
          <p className="text-sm mt-10">
            Note: This should be instant, but if you&apos;re still waiting after
            30 seconds, please join our discord and we&apos;ll help you out. Or
            you can email us at help@helicone.ai.
          </p>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex flex-col space-y-4 items-center text-gray-900">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: PartyParrot,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height={100}
            width={100}
            isStopped={false}
            isPaused={false}
            style={{
              pointerEvents: "none",
              background: "transparent",
            }}
          />
          <p>We received an event, you&apos;re all set to use Helicone!</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-md bg-black px-4 py-2 text-base font-semibold leading-7 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View Dashboard
          </button>
        </div>
      </div>
    );
  }
};

export default ListeningForEvent;