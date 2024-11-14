import { useState } from "react";
import { fetchAstronomyData } from "@/api/api";
import {
  Sun,
  Moon,
  MapPin,
  Clock,
  Calendar,
  Sunrise,
  Sunset,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "../ui/date-picker";
import { format } from "date-fns";
import { isAxiosError } from "axios";

interface Location {
  name: string;
  country: string;
  localtime: string;
}

interface AstronomyData {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
  is_moon_up: boolean;
  is_sun_up: boolean;
}

function Astronomy() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [astronomyData, setAstronomyData] = useState<AstronomyData | null>(
    null
  );
  const [locationData, setLocationData] = useState<Location | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formattedApiDate = date ? format(date, "yyyy-MM-dd") : "";
    const formattedNewDate = date ? format(date, "PPP") : "";
    setFormattedDate(formattedNewDate);

    try {
      const data = await fetchAstronomyData(city, formattedApiDate);
      console.log(data);
      if (data && data.astronomy) {
        setAstronomyData(data.astronomy.astro);
        setLocationData(data.location);
      } else {
        setError("Invalid data format received");
      }
    } catch (err) {
      if (isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Failed to fetch astronomy data"
        );
      } else {
        setError("An unexpected error occurred");
      }
    }
    setLoading(false);
  };
  return (
    <div className="w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mb-6 rounded-lg border shadow-sm p-4 max-w-md mx-auto"
      >
        <div className="flex gap-2">
          <Input
            required
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <DatePicker
            date={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Get Forecast"}
          </Button>
        </div>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {/* Astronomy Card */}
      {locationData && (
        <div className="bg-card p-6 rounded-lg border shadow-sm max-w-2xl mx-auto">
          {/* Location Header */}
          <div className="flex flex-col items-center space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight hover:text-primary transition-colors duration-300">
                {locationData?.name}, {locationData?.country}
              </h2>
            </div>

            {/* Time Information */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Local Time:</span>
                <span className="font-medium">
                  {format(locationData.localtime, "PPP p")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Forecast Date:</span>
                <span className="font-medium">{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {astronomyData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          {/* Sun Data */}
          <div className="space-y-6 p-8 rounded-xl border bg-card hover:shadow-lg transition-all duration-300">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-semibold flex justify-center items-center gap-2">
                <Sun className="h-6 w-6 text-yellow-500" />
                <span>Sun</span>
              </h3>
              {/* Sun Status Icon */}
              {/* <div className="text-4xl mb-4">
                {astronomyData?.is_sun_up ? "☀️" : "☀️"}
              </div> */}
            </div>

            <div className="space-y-4 divide-y">
              <div className="flex justify-between items-center pb-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Sunrise className="h-4 w-4" />
                  Sunrise
                </span>
                <span className="font-medium">{astronomyData?.sunrise}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Sunset className="h-4 w-4" />
                  Sunset
                </span>
                <span className="font-medium">{astronomyData?.sunset}</span>
              </div>
              {/* <div className="flex justify-between items-center pt-2">
                <span className="text-muted-foreground">Status</span>
                <span
                  className={`font-medium ${
                    astronomyData?.is_sun_up
                      ? "text-yellow-500"
                      : "text-blue-500"
                  }`}
                >
                  {astronomyData?.is_sun_up ? "Above Horizon" : "Below Horizon"}
                </span>
              </div> */}
            </div>
          </div>

          {/* Moon Data */}
          <div className="space-y-6 p-8 rounded-xl border bg-card hover:shadow-lg transition-all duration-300">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-semibold flex justify-center items-center gap-2">
                <Moon className="h-6 w-6 text-blue-400" />
                <span>Moon</span>
              </h3>
            </div>

            <div className="space-y-4 divide-y">
              <div className="flex justify-between items-center pb-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Sunrise className="h-4 w-4" />
                  Moonrise
                </span>
                <span className="font-medium">{astronomyData?.moonrise}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Sunset className="h-4 w-4" />
                  Moonset
                </span>
                <span className="font-medium">{astronomyData?.moonset}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Phase</span>
                <span className="font-medium">{astronomyData?.moon_phase}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Illumination</span>
                <span className="font-medium">
                  {astronomyData?.moon_illumination}%
                </span>
              </div>
              {/* Moon Phase Icon */}
              <div className="text-4xl p-4">
                {(() => {
                  switch (astronomyData?.moon_phase.toLowerCase()) {
                    case "new moon":
                      return "🌑";
                    case "waxing crescent":
                      return "🌒";
                    case "first quarter":
                      return "🌓";
                    case "waxing gibbous":
                      return "🌔";
                    case "full moon":
                      return "🌕";
                    case "waning gibbous":
                      return "🌖";
                    case "last quarter":
                      return "🌗";
                    case "waning crescent":
                      return "🌘";
                    default:
                      return "🌙";
                  }
                })()}
              </div>
              {/* <div className="flex justify-between items-center pt-2">
                <span className="text-muted-foreground">Status</span>
                <span
                  className={`font-medium ${
                    astronomyData?.is_moon_up
                      ? "text-blue-400"
                      : "text-gray-500"
                  }`}
                >
                  {astronomyData?.is_moon_up
                    ? "Above Horizon"
                    : "Below Horizon"}
                </span>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Astronomy;
