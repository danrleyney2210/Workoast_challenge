import { useFormContext } from "react-hook-form";
import { FormValues } from "./form";
import { trpc } from "@/trpc";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, Users, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/classnames";

export function AdditionalFilters() {
  const form = useFormContext<FormValues>();
  const [options] = trpc.vehicles.options.useSuspenseQuery();

  const price = form.watch("price");
  const classification = form.watch("classification");
  const make = form.watch("make");
  const minPassengers = form.watch("minPassengers");

  return (
    <Accordion
      type="multiple"
      defaultValue={["price", "classification", "make", "passengers"]}
      className="space-y-4"
    >
      <AccordionItem value="price" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>Price Range (per hour)</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <Slider
              min={0}
              max={100}
              step={5}
              value={price}
              onValueChange={(value) => {
                if (Array.isArray(value) && value.length === 2) {
                  form.setValue("price", value as [number, number]);
                }
              }}
              className="mt-6"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${price[0]}</span>
              <span>${price[1]}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="classification" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            <span>Vehicle Class</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid gap-3">
            {options.classifications.map((cls) => (
              <div key={cls} className="flex items-center space-x-2">
                <Checkbox
                  id={cls}
                  checked={classification.includes(cls)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      form.setValue("classification", [...classification, cls]);
                    } else {
                      form.setValue(
                        "classification",
                        classification.filter((c) => c !== cls),
                      );
                    }
                  }}
                />
                <Label htmlFor={cls} className="flex-1 text-sm">
                  {cls}
                </Label>
                <Badge variant="secondary" className="text-xs">
                  {options.classifications.filter((c) => c === cls).length}
                </Badge>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="make" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            <span>Brand</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="grid gap-3">
            {options.makes.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={make.includes(brand)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      form.setValue("make", [...make, brand]);
                    } else {
                      form.setValue(
                        "make",
                        make.filter((m) => m !== brand),
                      );
                    }
                  }}
                />
                <Label htmlFor={brand} className="flex-1 text-sm">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="passengers" className="border rounded-lg">
        <AccordionTrigger className="px-4 hover:no-underline">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Passengers</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <Select
            value={String(minPassengers)}
            onValueChange={(value) =>
              form.setValue("minPassengers", Number(value))
            }
          >
            <SelectTrigger
              className={cn(
                "w-full",
                !minPassengers && "text-muted-foreground",
              )}
            >
              <SelectValue placeholder="Select minimum passengers" />
            </SelectTrigger>
            <SelectContent>
              {options.passengerCounts.map((count) => (
                <SelectItem key={count} value={String(count)}>
                  {count} {count === 1 ? "passenger" : "passengers"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
