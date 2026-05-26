import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, useInView } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Home as HomeIcon,
  CheckCircle2,
  Star,
  Play,
  ArrowRight,
  Users,
  Clock,
  Shield,
  Truck,
  Award,
  CreditCard,
  Zap,
  Eye,
  Check,
  Paintbrush,
  Ruler,
  FileSignature,
  Hammer,
  ClipboardCheck,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  Percent,
  Gift
} from "lucide-react";
import { SiVk, SiTelegram, SiWhatsapp } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

// Assets
const Logo = ({ dark = false }: { dark?: boolean }) => (
  <div className="flex items-center gap-2.5 select-none">
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 22L24 6L42 22V44H30V32H18V44H6V22Z" stroke="#2563EB" strokeWidth="3.5" strokeLinejoin="round" fill="none"/>
      <rect x="28" y="14" width="10" height="14" stroke="#2563EB" strokeWidth="3" strokeLinejoin="round" fill="none"/>
      <rect x="20" y="27" width="8" height="7" rx="1" fill="#2563EB" opacity="0.25"/>
    </svg>
    <span className={`font-serif font-black text-xl tracking-wide leading-none ${dark ? "text-white" : "text-foreground"}`}>ВАЛДИ</span>
  </div>
);
import house1 from "@/assets/house1.png";
import house2 from "@/assets/house2.png";
import house3 from "@/assets/house3.png";
import interior1 from "@/assets/interior1.png";
import interior2 from "@/assets/interior2.png";
import interior3 from "@/assets/interior3.png";

// Form Schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Введите ваше имя"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  type: z.string({
    required_error: "Выберите тип проекта",
  }),
  comment: z.string().optional(),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Необходимо согласие",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Все");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      type: "",
      comment: "",
      privacy: true,
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    setIsSuccessModalOpen(true);
    form.reset();
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const projects = [
    { img: interior1, title: "ЖК \"Премиум\"", type: "Квартира", area: "110 м²", duration: "45 дней", price: "2.2 млн ₽", category: "Квартиры" },
    { img: interior2, title: "Офис IT-компании", type: "Офис", area: "200 м²", duration: "60 дней", price: "3.8 млн ₽", category: "Офисы" },
    { img: house1, title: "Коттедж в Подмосковье", type: "Коттедж", area: "280 м²", duration: "90 дней", price: "5.1 млн ₽", category: "Коттеджи" },
    { img: interior3, title: "Апартаменты", type: "Квартира", area: "85 м²", duration: "35 дней", price: "1.8 млн ₽", category: "Квартиры" },
    { img: house2, title: "Резиденция в Репино", type: "Коттедж", area: "320 м²", duration: "110 дней", price: "6.2 млн ₽", category: "Коттеджи" },
    { img: house3, title: "Торговое помещение", type: "Офис", area: "150 м²", duration: "50 дней", price: "2.9 млн ₽", category: "Офисы" },
  ];

  const filteredProjects = activeFilter === "Все" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary selection:text-white">
      {/* HEADER (sticky) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => scrollToSection("hero")} data-testid="link-home">
            <Logo />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollToSection("services")} className="text-[15px] font-medium text-foreground hover:text-primary transition-colors" data-testid="link-services">Услуги</button>
            <button onClick={() => scrollToSection("portfolio")} className="text-[15px] font-medium text-foreground hover:text-primary transition-colors" data-testid="link-portfolio">Проекты</button>
            <button onClick={() => scrollToSection("about")} className="text-[15px] font-medium text-foreground hover:text-primary transition-colors" data-testid="link-about">О компании</button>
            <button onClick={() => scrollToSection("contacts")} className="text-[15px] font-medium text-foreground hover:text-primary transition-colors" data-testid="link-contacts">Контакты</button>
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:+74951234567" className="text-base font-semibold hover:text-primary transition-colors" data-testid="link-phone">
              +7 (495) 123-45-67
            </a>
            <Button onClick={() => scrollToSection("contact-form")} data-testid="button-header-cta" className="h-11 px-6 rounded-full bg-primary hover:bg-primary/90 text-white font-medium shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5">
              Оставить заявку
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-20 z-40 bg-white/95 backdrop-blur-lg flex flex-col p-6 border-t border-border shadow-xl">
            <div className="flex flex-col gap-6 flex-grow pt-8">
              <button onClick={() => scrollToSection("services")} className="text-2xl font-serif text-left font-bold text-foreground hover:text-primary transition-colors" data-testid="link-mobile-services">Услуги</button>
              <button onClick={() => scrollToSection("portfolio")} className="text-2xl font-serif text-left font-bold text-foreground hover:text-primary transition-colors" data-testid="link-mobile-portfolio">Проекты</button>
              <button onClick={() => scrollToSection("about")} className="text-2xl font-serif text-left font-bold text-foreground hover:text-primary transition-colors" data-testid="link-mobile-about">О компании</button>
              <button onClick={() => scrollToSection("contacts")} className="text-2xl font-serif text-left font-bold text-foreground hover:text-primary transition-colors" data-testid="link-mobile-contacts">Контакты</button>
            </div>
            <div className="pb-8 flex flex-col gap-4">
              <a href="tel:+74951234567" className="text-xl font-bold flex items-center gap-3" data-testid="link-mobile-phone">
                <Phone className="w-5 h-5 text-primary" /> +7 (495) 123-45-67
              </a>
              <Button onClick={() => scrollToSection("contact-form")} className="w-full h-14 rounded-full text-base font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" data-testid="button-mobile-cta">Оставить заявку</Button>
            </div>
          </div>
        )}
      </header>

      {/* 1. HERO */}
      <section id="hero" className="relative min-h-[100dvh] pt-28 pb-20 flex items-center bg-white" style={{
        backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(37, 99, 235, 0.05) 2px, transparent 0)',
        backgroundSize: '40px 40px'
      }}>
        <div className="container mx-auto px-4 md:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 h-full items-center">
            {/* Left */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="py-10 lg:py-0"
            >
              <motion.div variants={fadeIn} className="mb-6 inline-block">
                <Badge className="bg-primary/10 hover:bg-primary/15 text-primary border-none px-4 py-1.5 text-[13px] font-semibold uppercase tracking-wider rounded-full">
                  Ремонт в Москве и области
                </Badge>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl lg:text-[72px] leading-[1.1] font-serif font-extrabold mb-6 text-foreground tracking-tight">
                Ремонт будущего: <br/>
                <span className="text-primary">Точно в срок.</span> <br/>
                Без скрытых платежей.
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl font-medium">
                Квартиры · Коттеджи · Коммерческие помещения
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4 md:gap-6 mb-12">
                <div className="flex items-center gap-2.5 text-sm md:text-base font-semibold text-foreground bg-white px-4 py-2 rounded-full shadow-sm border border-border">
                  <CheckCircle2 className="text-primary w-5 h-5" /> Гарантия 24 мес.
                </div>
                <div className="flex items-center gap-2.5 text-sm md:text-base font-semibold text-foreground bg-white px-4 py-2 rounded-full shadow-sm border border-border">
                  <CheckCircle2 className="text-primary w-5 h-5" /> Прозрачная смета
                </div>
                <div className="flex items-center gap-2.5 text-sm md:text-base font-semibold text-foreground bg-white px-4 py-2 rounded-full shadow-sm border border-border">
                  <CheckCircle2 className="text-primary w-5 h-5" /> Сроки в договоре
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 rounded-full text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all" onClick={() => scrollToSection("contact-form")} data-testid="btn-hero-primary">
                  Рассчитать стоимость
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base font-bold border-border text-foreground hover:bg-secondary hover:-translate-y-1 transition-all" onClick={() => scrollToSection("portfolio")} data-testid="btn-hero-secondary">
                  Посмотреть проекты
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full aspect-square lg:aspect-auto lg:h-[85vh]"
            >
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img src={interior1} alt="Interior Design" className="w-full h-full object-cover" />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -bottom-6 -left-6 md:bottom-8 md:-left-12 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-5 border border-border z-10"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <HomeIcon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-foreground leading-none">250+</div>
                  <div className="text-sm text-muted-foreground font-semibold mt-1">проектов завершено</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. BENTO FEATURES GRID */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Почему нас выбирают</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
            {[
              { icon: Shield, title: "Гарантия 24 месяца", desc: "Официально по договору", span: "md:col-span-2 lg:col-span-2 row-span-1" },
              { icon: Clock, title: "100% соблюдение сроков", desc: "Выплачиваем штрафы за просрочку", span: "md:col-span-1 lg:col-span-1 row-span-1" },
              { icon: Eye, title: "Выезд инженера бесплатно", desc: "Консультация в день обращения", span: "md:col-span-1 lg:col-span-1 row-span-2" },
              { icon: CreditCard, title: "Поэтапная оплата", desc: "Платите по факту выполнения", span: "md:col-span-1 lg:col-span-1 row-span-1" },
              { icon: CheckCircle2, title: "Контроль качества", desc: "Независимый внутренний технадзор", span: "md:col-span-2 lg:col-span-2 row-span-1" },
              { icon: Truck, title: "Материалы под ключ", desc: "Закупаем по оптовым ценам напрямую от дилеров", span: "md:col-span-2 lg:col-span-2 row-span-1" },
              { icon: Zap, title: "Вывоз мусора включён", desc: "Сдаём чистый объект", span: "md:col-span-1 lg:col-span-1 row-span-1" },
              { icon: Users, title: "Личный менеджер", desc: "На связи 24/7 для решения вопросов", span: "md:col-span-1 lg:col-span-1 row-span-1" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center border border-border/50 ${item.span}`}
                data-testid={`bento-feature-${i}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-xl text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground font-medium text-sm lg:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES WITH PRICING */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Услуги и цены</h2>
              <p className="text-lg text-muted-foreground max-w-2xl font-medium">Комплексный подход к ремонту любой сложности. Фиксируем цены в договоре.</p>
            </div>
            <Button variant="outline" className="rounded-full px-6 border-border font-semibold hover:bg-secondary">Скачать полный прайс</Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: HomeIcon, title: "Ремонт квартир", desc: "Полный цикл от демонтажа до расстановки мебели", price: "15 000", duration: "30" },
              { icon: Shield, title: "Ремонт коттеджей", desc: "Комплексная отделка загородной недвижимости", price: "18 000", duration: "60" },
              { icon: Users, title: "Ремонт офисов", desc: "Отделка коммерческих помещений в сжатые сроки", price: "12 000", duration: "45" },
              { icon: Paintbrush, title: "Дизайн-проект", desc: "Авторские концепции и рабочая документация", price: "2 500", duration: "14" },
              { icon: Hammer, title: "Черновой ремонт", desc: "Монтаж перегородок, стяжка, штукатурка, разводка", price: "6 000", duration: "14" },
              { icon: Award, title: "Чистовая отделка", desc: "Финишные работы, малярные работы, укладка полов", price: "9 000", duration: "21" },
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-border shadow-lg p-8 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col group"
                data-testid={`service-card-${i}`}
              >
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground font-medium mb-8 flex-grow">{service.desc}</p>
                
                <div className="space-y-3 mb-8 bg-secondary/50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-muted-foreground">Стоимость</span>
                    <span className="font-bold text-foreground">от {service.price} ₽/м²</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-muted-foreground">Сроки</span>
                    <span className="font-bold text-foreground">от {service.duration} дней</span>
                  </div>
                </div>

                <button onClick={() => scrollToSection("contact-form")} className="flex items-center gap-2 text-primary font-bold text-base hover:gap-3 transition-all mt-auto w-fit">
                  Оставить заявку <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROJECTS PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Наши проекты</h2>
              <p className="text-lg text-muted-foreground max-w-2xl font-medium">Реализованные объекты, которыми мы гордимся.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {["Все", "Квартиры", "Коттеджи", "Офисы"].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeFilter === filter 
                      ? "bg-primary text-white shadow-md" 
                      : "bg-white text-foreground hover:bg-white/80 shadow-sm border border-border"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-border/50 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-foreground backdrop-blur border-none font-bold px-3 py-1 shadow-sm">{project.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-secondary p-3 rounded-lg text-center">
                      <div className="text-[11px] text-muted-foreground font-semibold uppercase mb-1">Площадь</div>
                      <div className="font-bold text-sm text-foreground">{project.area}</div>
                    </div>
                    <div className="bg-secondary p-3 rounded-lg text-center">
                      <div className="text-[11px] text-muted-foreground font-semibold uppercase mb-1">Сроки</div>
                      <div className="font-bold text-sm text-foreground">{project.duration}</div>
                    </div>
                    <div className="bg-secondary p-3 rounded-lg text-center">
                      <div className="text-[11px] text-muted-foreground font-semibold uppercase mb-1">Бюджет</div>
                      <div className="font-bold text-sm text-foreground">{project.price}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATS / NUMBERS BAR */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-x-0 md:divide-x divide-white/20">
            {[
              { end: 12, suffix: "+ лет", label: "На рынке" },
              { end: 250, suffix: "+", label: "Сданных объектов" },
              { end: 98, suffix: "%", label: "Довольных клиентов" },
              { end: 24, suffix: " мес.", label: "Гарантия на работы" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-4">
                <div className="text-5xl md:text-6xl font-serif font-bold mb-3 drop-shadow-md">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-white/80 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Отзывы клиентов</h2>
            <p className="text-lg text-muted-foreground font-medium">Что говорят о нас те, кто уже живет в обновленном интерьере</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Александр В.", date: "15.03.2025", type: "Квартира 110 м²", quote: "Делали ремонт квартиры 110 м². Прораб всегда на связи, смета не выросла ни на рубль от изначальной. Сдали на неделю раньше срока.", initials: "АВ" },
              { name: "Ирина М.", date: "04.11.2024", type: "Коттедж 280 м²", quote: "Заказывали дизайн-проект и ремонт коттеджа 280 м². Очень порадовал подход к деталям и чистота на объекте. Рекомендую однозначно.", initials: "ИМ" },
              { name: "Дмитрий К.", date: "22.01.2025", type: "Офис 200 м²", quote: "Офис 200 м² за 60 дней. Профессиональная бригада, результат превзошёл ожидания. Руководство довольно, сотрудники в восторге от нового пространства.", initials: "ДК" }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-border shadow-lg rounded-2xl p-8 hover:shadow-xl transition-shadow relative"
              >
                <div className="absolute top-6 right-8 text-secondary">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <div className="flex gap-1 mb-6 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-foreground font-medium text-lg mb-8 relative z-10 leading-relaxed">"{review.quote}"</p>
                <div className="flex items-center gap-4 mt-auto border-t border-border pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm border-2 border-primary/20">{review.initials}</div>
                  <div>
                    <div className="font-bold text-foreground">{review.name}</div>
                    <div className="text-sm text-muted-foreground font-medium">{review.type} · {review.date}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROCESS STEPS */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Как мы работаем</h2>
            <p className="text-lg text-muted-foreground font-medium">Прозрачный процесс от первого звонка до новоселья</p>
          </motion.div>

          <div className="relative">
            {/* Desktop timeline line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-border z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-4 relative z-10">
              {[
                { title: "Заявка", desc: "Звонок или форма на сайте", icon: Phone },
                { title: "Замер", desc: "Бесплатный выезд инженера", icon: Ruler },
                { title: "Дизайн и смета", desc: "Точный расчет стоимости", icon: Paintbrush },
                { title: "Договор", desc: "Фиксация цены и сроков", icon: FileSignature },
                { title: "Ремонт", desc: "Регулярные фотоотчеты", icon: Hammer },
                { title: "Приёмка", desc: "Сдача готового объекта", icon: ClipboardCheck }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="w-16 h-16 bg-white rounded-full border-4 border-primary flex items-center justify-center mb-6 shadow-lg z-10 relative">
                    <span className="absolute -top-3 -right-3 w-6 h-6 bg-primary text-white rounded-full text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-foreground mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground font-medium px-2">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT FORM */}
      <section id="contact-form" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/50 hidden lg:block rounded-l-3xl"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Form */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-border"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">Начать проект</h2>
              <p className="text-muted-foreground font-medium mb-8">Оставьте заявку, и мы перезвоним в течение 15 минут</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-foreground">Ваше имя</FormLabel>
                          <FormControl>
                            <Input placeholder="Иван Иванов" className="h-14 rounded-xl border-border bg-secondary/30 font-medium" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-foreground">Телефон</FormLabel>
                          <FormControl>
                            <Input placeholder="+7 (999) 000-00-00" className="h-14 rounded-xl border-border bg-secondary/30 font-medium" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-foreground">Тип объекта</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 rounded-xl border-border bg-secondary/30 font-medium">
                              <SelectValue placeholder="Выберите тип объекта" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Квартира">Квартира</SelectItem>
                            <SelectItem value="Коттедж">Коттедж</SelectItem>
                            <SelectItem value="Офис">Коммерческое помещение</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-foreground">Комментарий (необязательно)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Площадь, пожелания, удобное время для звонка..." className="min-h-[120px] rounded-xl border-border bg-secondary/30 font-medium resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privacy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1 border-primary data-[state=checked]:bg-primary" />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium text-muted-foreground cursor-pointer">
                            Соглашаюсь с политикой конфиденциальности и обработкой персональных данных
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-16 rounded-full text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20">
                    Отправить заявку
                  </Button>
                </form>
              </Form>
            </motion.div>

            {/* Contacts Info */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="lg:pl-10"
            >
              <h3 className="text-3xl font-serif font-bold text-foreground mb-10">Будем рады ответить на ваши вопросы</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Телефон</div>
                    <a href="tel:+74951234567" className="text-2xl font-bold text-foreground hover:text-primary transition-colors block">+7 (495) 123-45-67</a>
                    <div className="text-sm font-medium text-muted-foreground mt-1">Пн-Вс: 9:00 - 21:00</div>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Email</div>
                    <a href="mailto:info@valdi-renovation.ru" className="text-xl font-bold text-foreground hover:text-primary transition-colors">info@valdi-renovation.ru</a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Офис</div>
                    <div className="text-xl font-bold text-foreground">г. Москва, Пресненская наб., 12</div>
                    <div className="text-sm font-medium text-muted-foreground mt-1">ММДЦ «Москва-Сити», Башня Федерация</div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-border">
                <div className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Написать в мессенджеры</div>
                <div className="flex gap-4">
                  <a href="#" className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-[#25D366] hover:-translate-y-1 transition-transform">
                    <SiWhatsapp className="w-7 h-7" />
                  </a>
                  <a href="#" className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-[#0088cc] hover:-translate-y-1 transition-transform">
                    <SiTelegram className="w-7 h-7" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. PROMOTIONS */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Акции и предложения</h2>
            <p className="text-lg text-muted-foreground font-medium">Выгодные условия для наших клиентов</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Дизайн-проект в подарок", desc: "При заказе ремонта под ключ от 60 м². Разработаем 3D-визуализацию и чертежи.", date: "До 30 июня", icon: Gift },
              { title: "Скидка 10% на чистовую отделку", desc: "Действует при внесении предоплаты от 50% стоимости работ.", date: "Постоянная акция", icon: Percent },
              { title: "Ремонт в рассрочку 0%", desc: "Оформляем беспроцентную рассрочку на срок до 12 месяцев от банков-партнеров.", date: "Индивидуально", icon: CreditCard }
            ].map((promo, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border-2 border-primary/20 p-8 rounded-2xl relative overflow-hidden group hover:border-primary transition-colors"
              >
                <div className="absolute top-0 right-0 bg-primary text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">Акция</div>
                <promo.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">{promo.title}</h3>
                <p className="text-muted-foreground font-medium mb-6">{promo.desc}</p>
                <div className="text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg inline-block">{promo.date}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Частые вопросы</h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "Выезжает ли замерщик бесплатно?", a: "Да, выезд инженера-сметчика и составление подробной сметы предоставляются абсолютно бесплатно и ни к чему вас не обязывают." },
              { q: "Может ли измениться цена в процессе ремонта?", a: "Нет, стоимость работ фиксируется в договоре. Цена может измениться только в случае, если вы сами решите добавить новые виды работ, которые не были учтены изначально." },
              { q: "Кто закупает черновые материалы?", a: "Мы берем на себя закупку, доставку и подъем всех черновых материалов. Закупаем напрямую у производителей по оптовым ценам, что экономит ваш бюджет до 20%." },
              { q: "Как происходит оплата?", a: "Оплата производится поэтапно. Вы платите только за выполненный и принятый вами этап работ. Никаких 100% предоплат за работу." },
              { q: "Нужно ли мне приезжать на объект для контроля?", a: "Не обязательно. Мы создаем чат в WhatsApp/Telegram, куда прораб регулярно отправляет фото- и видеоотчеты о проделанной работе." },
              { q: "Какую гарантию вы даете?", a: "Мы предоставляем официальную гарантию 24 месяца на все виды выполненных работ по договору." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl bg-secondary/20 px-6 data-[state=open]:bg-white data-[state=open]:shadow-md transition-all">
                <AccordionTrigger className="text-lg font-bold hover:no-underline text-left py-6">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-medium text-base pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 11. ABOUT + TEAM */}
      <section id="about" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 mb-24">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">О компании ВАЛДИ</h2>
              <p className="text-lg text-muted-foreground font-medium mb-6 leading-relaxed">
                Мы создаем современные, комфортные и долговечные интерьеры с 2012 года. Наш подход основан на полной прозрачности, строгом соблюдении технологий и уважении к времени заказчика.
              </p>
              <p className="text-lg text-muted-foreground font-medium mb-10 leading-relaxed">
                За время работы мы сформировали надежную команду узкопрофильных специалистов, где каждый мастер отвечает за свой этап: от инженерии до ювелирной чистовой отделки.
              </p>
              <Button onClick={() => scrollToSection("portfolio")} className="h-14 px-8 rounded-full text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg">Смотреть портфолио</Button>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Год основания", value: "2012" },
                { label: "Реализовано проектов", value: "250+" },
                { label: "Специалистов в штате", value: "45" },
                { label: "Средний стаж мастеров", value: "8 лет" },
                { label: "Рекомендуют нас", value: "98%" },
                { label: "Официальная гарантия", value: "2 года" }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-border">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">{stat.value}</div>
                  <div className="font-bold text-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Команда руководителей</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Валерий Д.", role: "Генеральный директор", exp: "В строительстве 15 лет", initials: "ВД" },
              { name: "Михаил С.", role: "Главный инженер", exp: "Опыт 12 лет", initials: "МС" },
              { name: "Елена В.", role: "Руководитель студии дизайна", exp: "Более 100 проектов", initials: "ЕВ" },
              { name: "Андрей К.", role: "Руководитель технадзора", exp: "Стаж 10 лет", initials: "АК" }
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl text-center border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 text-primary text-2xl font-serif font-bold flex items-center justify-center mx-auto mb-4 border-4 border-secondary">{member.initials}</div>
                <h4 className="font-serif font-bold text-xl text-foreground mb-1">{member.name}</h4>
                <div className="text-primary font-bold text-sm mb-2">{member.role}</div>
                <div className="text-sm text-muted-foreground font-medium">{member.exp}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="bg-[#1E293B] text-white pt-20 pb-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="mb-6"><Logo dark /></div>
              <p className="text-slate-400 font-medium mb-6">Профессиональный ремонт и дизайн интерьеров в Москве и Московской области.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                  <SiVk className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                  <SiTelegram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                  <SiWhatsapp className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Навигация</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><button onClick={() => scrollToSection("hero")} className="hover:text-white transition-colors">Главная</button></li>
                <li><button onClick={() => scrollToSection("portfolio")} className="hover:text-white transition-colors">Проекты</button></li>
                <li><button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">О компании</button></li>
                <li><button onClick={() => scrollToSection("contacts")} className="hover:text-white transition-colors">Контакты</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Услуги</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors">Ремонт квартир</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors">Ремонт коттеджей</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors">Ремонт офисов</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors">Дизайн интерьера</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Контакты</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>г. Москва, Пресненская наб., 12<br/>Башня Федерация</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href="tel:+74951234567" className="hover:text-white transition-colors">+7 (495) 123-45-67</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href="mailto:info@valdi-renovation.ru" className="hover:text-white transition-colors">info@valdi-renovation.ru</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm font-medium">
            <div>© {new Date().getFullYear()} Строительная компания «ВАЛДИ». Все права защищены.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl p-8 bg-white border-none shadow-2xl">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <DialogTitle className="text-3xl font-serif font-bold text-foreground mb-4">Спасибо за заявку!</DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground font-medium mb-8">
              Ваши данные успешно отправлены. Наш менеджер свяжется с вами в течение 15 минут для уточнения деталей.
            </DialogDescription>
            <Button onClick={() => setIsSuccessModalOpen(false)} className="w-full h-14 rounded-full text-base font-bold bg-primary hover:bg-primary/90 text-white">
              Закрыть
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
