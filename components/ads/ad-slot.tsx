import { type Locale } from "@/lib/i18n/config";
import { getSiteMessages } from "@/lib/i18n/messages";

type AdSlotProps = {
  locale: Locale;
  label: string;
};

export function AdSlot({ locale, label }: AdSlotProps) {
  const messages = getSiteMessages(locale);

  return (
    <div className="border-line bg-surface/70 rounded-[1.75rem] border border-dashed p-5 text-center">
      <p className="text-muted text-xs tracking-[0.26em] uppercase">
        {messages.shared.reservedAdSlot}
      </p>
      <p className="text-muted mt-2 text-sm leading-7">{label}</p>
    </div>
  );
}
