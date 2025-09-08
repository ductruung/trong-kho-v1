"use client"
import { Select } from "radix-ui";
import { useState } from "react";

export default function LiveWatchingSelect() {
  const [value, setValue] = useState("on");
  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger
        className="inline-flex cursor-pointer border border-input rounded-full justify-between gap-2 bg-transparent px-3 py-2 text-xs items-center hover:border-white/30 transition"
      >
        <Select.Value>
          {value === "on" ? "Đang theo dõi trực tiếp" : "Không theo dõi"}
        </Select.Value>
        <Select.Icon asChild>
          <div className={`w-2 h-2 bg-green-600 rounded-full`}></div>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="bg-popover text-xs border text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-md shadow-md"
          position="popper"
          align="center"
          alignOffset={3}
        >
          <Select.Viewport className="p-2 cursor-pointer flex flex-col gap-2">
            <Select.Item value="on">
              Bật theo dõi trực tiếp
            </Select.Item>
            <Select.Separator className="h-px bg-muted-foreground" />
            <Select.Item value="off">
              Tắt theo dõi trực tiếp
            </Select.Item>
          </Select.Viewport>
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}