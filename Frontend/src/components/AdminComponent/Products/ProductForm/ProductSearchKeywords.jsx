import { useState } from "react";

function ProductSearchKeywords({ keywords = [], onChange, error }) {
  const [inputValue, setInputValue] = useState("");

  const addKeyword = () => {
    const keyword = inputValue.trim();

    if (!keyword) return;

    // Duplicate keywords prevent karega
    if (keywords.some((item) => item.toLowerCase() === keyword.toLowerCase())) {
      setInputValue("");
      return;
    }

    onChange([...keywords, keyword]);
    setInputValue("");
  };

  const removeKeyword = (indexToRemove) => {
    onChange(
      keywords.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword();
    }

    // Backspace par last keyword remove
    if (
      e.key === "Backspace" &&
      !inputValue &&
      keywords.length > 0
    ) {
      removeKeyword(keywords.length - 1);
    }
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Search Keywords
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Add keywords that customers might use to find your product.
        </p>
      </div>

      <div>
        <label
          htmlFor="product-keywords"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Keywords
          <span className="ml-1 text-red-500">*</span>
        </label>

        <div
          className={`flex min-h-11 w-full flex-wrap items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2 transition ${
            error
              ? "border-red-300"
              : "border-gray-200 focus-within:border-[#0B1F3A] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0B1F3A]/10"
          }`}
        >
          {/* Keyword Chips */}
          {keywords.map((keyword, index) => (
            <span
              key={`${keyword}-${index}`}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#0B1F3A]/10 px-2.5 py-1 text-xs font-medium text-[#0B1F3A]"
            >
              {keyword}

              <button
                type="button"
                onClick={() => removeKeyword(index)}
                className="flex h-4 w-4 items-center justify-center rounded-full text-[#0B1F3A]/60 transition hover:bg-[#0B1F3A] hover:text-white"
                aria-label={`Remove ${keyword}`}
              >
                ×
              </button>
            </span>
          ))}

          {/* Input */}
          <input
            id="product-keywords"
            name="keywords"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addKeyword}
            placeholder={
              keywords.length === 0
                ? "Type a keyword and press Enter..."
                : "Add another keyword..."
            }
            className="h-7 min-w-[180px] flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
        </div>

        <p className="mt-1.5 text-xs text-gray-400">
          Press Enter or comma to add a keyword. Press Backspace to remove the
          last keyword.
        </p>

        {error && (
          <p className="mt-1.5 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

export default ProductSearchKeywords;
