import { Page } from "@/App";
import NewsLive from "@/components/NewsLive";

interface NewsProps {
  navigate: (page: Page) => void;
  full?: boolean;
}

export default function News({ navigate, full }: NewsProps) {
  return (
    <div className={full ? "pt-8 sm:pt-12" : ""}>
      <NewsLive navigate={navigate} />
    </div>
  );
}
