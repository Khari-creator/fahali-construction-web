import { MapPin, Phone } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-black text-white text-sm py-2">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* LOCATION */}
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-red-600" />
          <span className="tracking-wide">Biashara Street, Hison Plaza, Nairobi</span>
        </div>

        {/* PHONE */}
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-red-600" />
          <span className="tracking-wide">0703204119</span>
        </div>

      </div>
    </div>
  );
}
