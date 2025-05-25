import { CalculatorIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useRef } from "react";

const CalculatorModal = () => {
  const operatorSymbols = ["+", "-", "*", "/"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [display, setDisplay] = useState("");
  const displayRef = useRef(display);

  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // تابع مرکزی مدیریت ورودی‌ها (دکمه‌های کلیکی یا کیبورد)
  const handleButtonClick = (value) => {
    if (value === "C") {
      setDisplay("");
      return;
    }
    if (value === "=") {
      try {
        const result = eval(displayRef.current);
        setDisplay(String(result));
      } catch (error) {
        setDisplay("خطا");
      }
      return;
    }

    // اگر ورودی یک عملگر است
    if (operatorSymbols.includes(value)) {
      setDisplay((prev) => {
        if (prev === "") {
          // اجازه شروع با منفی داده می‌شود؛ سایر عملگرها نادیده گرفته می‌شوند
          return value === "-" ? "-" : prev;
        }
        const lastChar = prev.slice(-1);
        if (operatorSymbols.includes(lastChar)) {
          // اگر عملگر تکراری است، تغییری ایجاد نمی‌شود؛ در غیر این صورت جایگزین می‌شود
          if (lastChar === value) {
            return prev;
          } else {
            return prev.slice(0, -1) + value;
          }
        }
        return prev + value;
      });
      return;
    }

    // ورودی‌های عددی یا نقطه
    setDisplay((prev) => prev + value);
  };

  // فعال کردن ارتباط با کیبورد وقتی مودال باز است
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (event) => {
      const { key } = event;
      if (
        (key >= "0" && key <= "9") ||
        key === "." ||
        operatorSymbols.includes(key)
      ) {
        event.preventDefault();
        handleButtonClick(key);
      } else if (key === "Enter") {
        event.preventDefault();
        handleButtonClick("=");
      } else if (key === "Backspace") {
        event.preventDefault();
        setDisplay((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        event.preventDefault();
        setDisplay("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, operatorSymbols]);

  return (
    <div className="">
      {/* دکمه باز کردن مودال ماشین حساب */}
      <button
        onClick={openModal}
        className="p-2 rounded"
      >
                <CalculatorIcon className="h-7 inline-block w-7"/>

      </button>

      {/* مودال ماشین حساب */}
      {isModalOpen && (
        // این بخش پوشش مودال است؛ با کلیک روی این پوشش مودال بسته می‌شود.
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          {/* کادر اصلی مودال که کلیک روی آن مانع انتشار رویداد به پوشش می‌شود */}
          <div
            className="bg-base-100 rounded-lg shadow-lg p-6 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">ماشین حساب</h2>
              <button
                onClick={closeModal}
                className=" text-base-content hover:text-gray-900 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* نمایش ورودی یا نتیجه */}
            <div className="border rounded p-2 mb-4 text-right text-lg bg-gray-100">
              {display || "0"}
            </div>

            {/* دکمه‌های ماشین حساب */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleButtonClick("7")}
                className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
              >
                7
              </button>
              <button
                onClick={() => handleButtonClick("8")}
                className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
              >
                8
              </button>
              <button
                onClick={() => handleButtonClick("9")}
                className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
              >
                9
              </button>
              <button
                onClick={() => handleButtonClick("/")}
                className="bg-orange-400 hover:bg-orange-500 p-2 rounded"
              >
                /
              </button>

              <button
                onClick={() => handleButtonClick("4")}
                className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
              >
                4
              </button>
              <button
                onClick={() => handleButtonClick("5")}
                className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
              >
                5
              </button>
              <button
                onClick={() => handleButtonClick("6")}
                className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
              >
                6
              </button>
              <button
                onClick={() => handleButtonClick("*")}
                className="bg-orange-400 hover:bg-orange-500 p-2 rounded"
              >
                *
              </button>

              <button
                onClick={() => handleButtonClick("1")}
                className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
              >
                1
              </button>
              <button
                onClick={() => handleButtonClick("2")}
                className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
              >
                2
              </button>
              <button
                onClick={() => handleButtonClick("3")}
                className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
              >
                3
              </button>
              <button
                onClick={() => handleButtonClick("-")}
                className="bg-orange-400 hover:bg-orange-500 p-2 rounded"
              >
                -
              </button>

              <button
                onClick={() => handleButtonClick("0")}
                className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
              >
                0
              </button>
              <button
                onClick={() => handleButtonClick(".")}
                className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
              >
                .
              </button>
              <button
                onClick={() => handleButtonClick("C")}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
              >
                C
              </button>
              <button
                onClick={() => handleButtonClick("+")}
                className="bg-orange-400 hover:bg-orange-500 p-2 rounded"
              >
                +
              </button>

              <button
                onClick={() => handleButtonClick("=")}
                className="col-span-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
              >
                =
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorModal;
