"use client";

import { useEffect, useRef, useState } from "react";

import type { ThemeDefinition } from "../types";
import { useTheme } from "./UnifiedThemeProvider";

export interface ThemeCarouselProps {
  className?: string;
  onThemeSelect?: (themeId: string) => void;
  showTitle?: boolean;
  showControls?: boolean;
  autoScroll?: boolean;
  autoScrollInterval?: number;
  itemsToShow?: number;
}

export function ThemeCarousel({
  className = "",
  onThemeSelect,
  showTitle = true,
  showControls = true,
  autoScroll = false,
  autoScrollInterval = 5000,
  itemsToShow = 3,
}: ThemeCarouselProps) {
  const { availableThemes, themeStyle, setThemeStyle, canChangeThemeStyle } =
    useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate the visible theme items
  const visibleThemes = availableThemes.slice(
    currentIndex,
    currentIndex + itemsToShow,
  );

  // Find the index of the current theme
  const currentThemeIndex = availableThemes.findIndex(
    (theme) => theme.id === themeStyle,
  );

  // Handle theme selection
  const handleSelectTheme = (theme: ThemeDefinition) => {
    if (!canChangeThemeStyle) return;

    setThemeStyle(theme.id);
    if (onThemeSelect) {
      onThemeSelect(theme.id);
    }
  };

  // Navigation functions
  const scrollNext = () => {
    if (currentIndex + itemsToShow < availableThemes.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      // Loop back to the beginning
      setCurrentIndex(0);
    }
  };

  const scrollPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else {
      // Loop to the end
      setCurrentIndex(Math.max(0, availableThemes.length - itemsToShow));
    }
  };

  // Set up auto-scrolling
  useEffect(() => {
    if (autoScroll) {
      autoScrollTimerRef.current = setInterval(scrollNext, autoScrollInterval);
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [autoScroll, autoScrollInterval, currentIndex]);

  // Scroll to the current theme on initial load
  useEffect(() => {
    if (currentThemeIndex !== -1 && currentThemeIndex !== currentIndex) {
      // Ensure the currently selected theme is visible
      if (
        currentThemeIndex < currentIndex ||
        currentThemeIndex >= currentIndex + itemsToShow
      ) {
        setCurrentIndex(Math.max(0, currentThemeIndex));
      }
    }
  }, [currentThemeIndex]);

  return (
    <div className={`theme-carousel ${className}`}>
      {showTitle && (
        <h3 className="mb-3 text-lg font-medium">Choose a Theme Style</h3>
      )}

      <div className="relative">
        {showControls && availableThemes.length > itemsToShow && (
          <div className="absolute inset-y-0 left-0 z-10 flex items-center">
            <button
              onClick={scrollPrev}
              className="rounded-full bg-background/80 p-1 shadow backdrop-blur hover:bg-background"
              aria-label="Previous themes"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>
        )}

        <div ref={carouselRef} className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(0px)` }}
          >
            {visibleThemes.map((theme) => (
              <div
                key={theme.id}
                className={`theme-item flex-shrink-0 p-2 transition-all duration-300 w-1/${itemsToShow} min-w-[140px]`}
                style={{ maxWidth: `${100 / itemsToShow}%` }}
              >
                <div
                  className={`theme-preview cursor-pointer overflow-hidden rounded-lg border-2 transition-all hover:shadow-md ${
                    theme.id === themeStyle
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => handleSelectTheme(theme)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelectTheme(theme);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={theme.id === themeStyle}
                >
                  {typeof theme.preview === "string" ? (
                    <img
                      src={theme.preview}
                      alt={`${theme.name} theme preview`}
                      className="aspect-video w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-video w-full items-center justify-center bg-muted">
                      {theme.name}
                    </div>
                  )}
                  <div className="truncate px-3 py-2 text-sm font-medium">
                    {theme.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showControls && availableThemes.length > itemsToShow && (
          <div className="absolute inset-y-0 right-0 z-10 flex items-center">
            <button
              onClick={scrollNext}
              className="rounded-full bg-background/80 p-1 shadow backdrop-blur hover:bg-background"
              aria-label="Next themes"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {showControls && availableThemes.length > itemsToShow && (
        <div className="mt-3 flex justify-center gap-1">
          {Array.from({
            length: Math.ceil(availableThemes.length / itemsToShow),
          }).map((_, index) => {
            const isActive =
              currentIndex >= index * itemsToShow &&
              currentIndex < (index + 1) * itemsToShow;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsToShow)}
                className={`h-2 rounded-full transition-all ${
                  isActive
                    ? "w-4 bg-primary"
                    : "w-2 bg-muted hover:bg-muted-foreground"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
