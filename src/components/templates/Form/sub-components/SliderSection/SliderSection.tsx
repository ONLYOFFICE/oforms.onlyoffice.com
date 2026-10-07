/*
 * Copyright (C) Ascensio System SIA, 2009-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation, together with the
 * additional terms provided in the LICENSE file.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For
 * details, see the GNU AGPL at: https://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA by email at info@onlyoffice.com
 * or by postal mail at 20A-6 Ernesta Birznieka-Upisha Street, Riga,
 * LV-1050, Latvia, European Union.
 *
 * The interactive user interfaces in modified versions of the Program
 * are required to display Appropriate Legal Notices in accordance with
 * Section 5 of the GNU AGPL version 3.
 *
 * No trademark rights are granted under this License.
 *
 * All non-code elements of the Product, including illustrations,
 * icon sets, and technical writing content, are licensed under the
 * Creative Commons Attribution-ShareAlike 4.0 International License:
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * This license applies only to such non-code elements and does not
 * modify or replace the licensing terms applicable to the Program's
 * source code, which remains licensed under the GNU Affero General
 * Public License v3.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { Section } from "@src/components/ui/Section";
import { Container } from "@src/components/ui/Container";
import { Heading } from "@src/components/ui/Heading";
import { Card } from "@src/components/widgets/Card";
import { ChevronDownIcon } from "@src/components/icons";
import { ISliderSection } from "./SliderSection.types";
import styles from "./SliderSection.module.scss";

const SWIPER_MODULES = [Navigation];
const BREAKPOINTS = {
  0: {
    enabled: false,
    spaceBetween: 16,
  },
  592: {
    enabled: false,
    spaceBetween: 40,
  },
  768: {
    enabled: true,
    slidesPerView: 3,
    spaceBetween: 32,
  },
  1024: {
    enabled: true,
    slidesPerView: 4,
    spaceBetween: 72,
  },
  1440: {
    enabled: true,
    slidesPerView: 4,
    spaceBetween: 72,
  },
};

const SliderSection = ({ heading, data }: ISliderSection) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  const bindNavigation = (swiper: SwiperClass) => {
    if (
      swiper.destroyed ||
      typeof swiper.params.navigation === "boolean" ||
      !swiper.params.navigation
    ) {
      return;
    }

    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  };

  const slides = data.filter(
    (item) =>
      item.card_prewiew &&
      item.name_form &&
      item.description_card &&
      item.url &&
      item.form_exts,
  );

  useEffect(() => {
    if (swiperRef.current) {
      bindNavigation(swiperRef.current);
    }
  }, [slides.length]);

  return (
    <Section
      className={styles["slider-section"]}
      desktopSpacing={["32px", "32px"]}
      tabletSpacing={["32px", "32px"]}
      tabletSmallSpacing={["32px", "32px"]}
      mobileSpacing={["34px", "34px"]}
    >
      <Container maxWidth="1452px">
        <Heading
          className={styles["slider-section-heading"]}
          level={2}
          size={3}
          color="var(--form-slider-section-heading-color)"
        >
          {heading}
        </Heading>

        <div className={styles["slider-section-wrapper"]}>
          <Swiper
            breakpoints={BREAKPOINTS}
            modules={SWIPER_MODULES}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper: SwiperClass) => {
              swiperRef.current = swiper;
              bindNavigation(swiper);
            }}
          >
            {slides.map((item) => (
              <SwiperSlide key={item.id}>
                <Card
                  className={styles["slider-section-card"]}
                  preview={item.card_prewiew}
                  format={item.form_exts}
                  heading={item.name_form}
                  description={item.description_card}
                  url={item.url}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {slides.length > 4 && (
            <div className={styles["slider-section-navigation"]}>
              <button
                ref={prevRef}
                type="button"
                className={styles["slider-section-button-prev"]}
              >
                <ChevronDownIcon />
              </button>
              <button
                ref={nextRef}
                type="button"
                className={styles["slider-section-button-next"]}
              >
                <ChevronDownIcon />
              </button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export { SliderSection };
