'use client';

import { useFormStatus } from "react-dom";
import { LoaderPinwheel } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending ? true : false}
      className="inline-flex w-full justify-center rounded-md bg-complementary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-complementary/70 sm:ml-3 sm:w-auto">
      {pending ? (
        <span>
          Submitting <LoaderPinwheel className="animate-spin" />
        </span>
      ) : (
        "Submit"
      )}
    </button>
  );
}
export default SubmitButton;