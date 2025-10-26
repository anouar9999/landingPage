import React, { useMemo } from "react";
import { motion } from "framer-motion";
import useTranslation from "../hooks/useTranslation";
import FrenchTitle from "./FrenchTitle";
import AnimatedTitle from "./AnimatedTitle";

const ProvidenceGameShowcase = () => {
  const { t, language, isRtl, getTextClass } = useTranslation();

  const steps = useMemo(
    () => [
      {
        key: "step1",
        title: t("tri9lGlory.steps.step1Title"),
        description: t("tri9lGlory.steps.step1"),
      },
      {
        key: "step2",
        title: t("tri9lGlory.steps.step2Title"),
        description: t("tri9lGlory.steps.step2"),
      },
      {
        key: "step3",
        title: t("tri9lGlory.steps.step3Title"),
        description: t("tri9lGlory.steps.step3"),
      },
    ],
    [t]
  );

  const accentGradients = [
    "from-amber-500/80 via-orange-500/80 to-rose-500/80",
    "from-sky-500/70 via-indigo-500/70 to-violet-500/70",
    "from-emerald-500/80 via-lime-500/70 to-amber-500/80",
  ];

  return (
    <section
      id="Tri9lGlory"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative isolate overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="absolute right-12 bottom-0 h-[360px] w-[360px] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute left-10 bottom-12 h-64 w-64 rounded-full border border-white/10" />
        <div className="absolute right-24 top-20 h-32 w-32 rounded-full border border-white/10" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex items-center justify-center gap-3 text-[0.7rem] uppercase tracking-[0.4em] text-amber-200/80">
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <span>{t("nav.tri9lGlory")}</span>
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>

          {language === "fr" ? (
            <FrenchTitle
              className="mt-6 !special-font text-4xl text-primary sm:text-5xl md:text-6xl lg:text-[4.75rem]"
              textKey="tri9lGlory.title"
              as="h2"
            />
          ) : (
            <AnimatedTitle
              title={t("tri9lGlory.title")}
              containerClass="mt-6 text-4xl text-primary sm:text-5xl md:text-6xl lg:text-[4.5rem]"
            />
          )}

          <p
            className={`mt-6 text-lg leading-relaxed text-gray-300 ${
              getTextClass ? getTextClass("body") : ""
            }`}
          >
            {t("tri9lGlory.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-amber-100/70">
            {steps.map((step) => (
              <span
                key={step.key}
                className="rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1 backdrop-blur-md"
              >
                {step.title}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.1,
              },
            },
          }}
          className="grid gap-8 lg:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.article
              key={step.key}
              variants={{
                hidden: { opacity: 0, y: 48 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: "easeOut" },
                },
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-start shadow-[0_25px_60px_-30px_rgba(255,136,0,0.35)] backdrop-blur-lg"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                  accentGradients[index % accentGradients.length]
                }`}
              />

              <div className="relative flex items-start justify-between">
                <span className="text-5xl font-black tracking-tight text-amber-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  {step.title}
                </span>
              </div>

              <p
                className={`mt-6 text-base leading-relaxed text-gray-200 ${
                  getTextClass ? getTextClass("body") : ""
                }`}
              >
                {step.description}
              </p>

              <div className="mt-10 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/40">
                <span>{t("nav.discover")}</span>
                <span className="mx-4 h-px flex-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <span>{t("nav.playFree")}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto flex w-full flex-col items-center gap-6 rounded-3xl border border-amber-400/30 bg-amber-400/10 p-8 text-center shadow-[0_20px_45px_-25px_rgba(251,191,36,0.55)] backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between sm:text-start sm:p-10"
        >
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-amber-50">
              {t("nav.playFree")}
            </h3>
            <p
              className={`mt-2 text-sm text-amber-50/70 ${
                getTextClass ? getTextClass("body") : ""
              }`}
            >
              {t("tri9lGlory.steps.step3")}
            </p>
          </div>

          <a
            href="#PassGamers"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-transform duration-200 hover:scale-105"
          >
            {t("hero.playNow")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProvidenceGameShowcase;