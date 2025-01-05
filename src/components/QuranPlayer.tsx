'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { trackEvent } from "@/lib/analytics";

// Surah data
const surahs = [
  { number: 1, name: "Al-Fatihah", arabicName: "الفاتحة" },
  { number: 2, name: "Al-Baqarah", arabicName: "البقرة" },
  { number: 3, name: "Aal-E-Imran", arabicName: "آل عمران" },
  { number: 4, name: "An-Nisa", arabicName: "النساء" },
  { number: 5, name: "Al-Maidah", arabicName: "المائدة" },
  { number: 6, name: "Al-An'am", arabicName: "الأنعام" },
  { number: 7, name: "Al-A'raf", arabicName: "الأعراف" },
  { number: 8, name: "Al-Anfal", arabicName: "الأنفال" },
  { number: 9, name: "At-Tawbah", arabicName: "التوبة" },
  { number: 10, name: "Yunus", arabicName: "يونس" },
  { number: 11, name: "Hud", arabicName: "هود" },
  { number: 12, name: "Yusuf", arabicName: "يوسف" },
  { number: 13, name: "Ar-Ra'd", arabicName: "الرعد" },
  { number: 14, name: "Ibrahim", arabicName: "إبراهيم" },
  { number: 15, name: "Al-Hijr", arabicName: "الحجر" },
  { number: 16, name: "An-Nahl", arabicName: "النحل" },
  { number: 17, name: "Al-Isra", arabicName: "الإسراء" },
  { number: 18, name: "Al-Kahf", arabicName: "الكهف" },
  { number: 19, name: "Maryam", arabicName: "مريم" },
  { number: 20, name: "Taha", arabicName: "طه" },
  { number: 21, name: "Al-Anbiya", arabicName: "الأنبياء" },
  { number: 22, name: "Al-Hajj", arabicName: "الحج" },
  { number: 23, name: "Al-Mu'minun", arabicName: "المؤمنون" },
  { number: 24, name: "An-Nur", arabicName: "النور" },
  { number: 25, name: "Al-Furqan", arabicName: "الفرقان" },
  { number: 26, name: "Ash-Shu'ara", arabicName: "الشعراء" },
  { number: 27, name: "An-Naml", arabicName: "النمل" },
  { number: 28, name: "Al-Qasas", arabicName: "القصص" },
  { number: 29, name: "Al-Ankabut", arabicName: "العنكبوت" },
  { number: 30, name: "Ar-Rum", arabicName: "الروم" },
  { number: 31, name: "Luqman", arabicName: "لقمان" },
  { number: 32, name: "As-Sajda", arabicName: "السجدة" },
  { number: 33, name: "Al-Ahzab", arabicName: "الأحزاب" },
  { number: 34, name: "Saba", arabicName: "سبأ" },
  { number: 35, name: "Fatir", arabicName: "فاطر" },
  { number: 36, name: "Ya-Sin", arabicName: "يس" },
  { number: 37, name: "As-Saffat", arabicName: "الصافات" },
  { number: 38, name: "Sad", arabicName: "ص" },
  { number: 39, name: "Az-Zumar", arabicName: "الزمر" },
  { number: 40, name: "Ghafir", arabicName: "غافر" },
  { number: 41, name: "Fussilat", arabicName: "فصلت" },
  { number: 42, name: "Ash-Shura", arabicName: "الشورى" },
  { number: 43, name: "Az-Zukhruf", arabicName: "الزخرف" },
  { number: 44, name: "Ad-Dukhan", arabicName: "الدخان" },
  { number: 45, name: "Al-Jathiya", arabicName: "الجاثية" },
  { number: 46, name: "Al-Ahqaf", arabicName: "الأحقاف" },
  { number: 47, name: "Muhammad", arabicName: "محمد" },
  { number: 48, name: "Al-Fath", arabicName: "الفتح" },
  { number: 49, name: "Al-Hujurat", arabicName: "الحجرات" },
  { number: 50, name: "Qaf", arabicName: "ق" },
  { number: 51, name: "Adh-Dhariyat", arabicName: "الذاريات" },
  { number: 52, name: "At-Tur", arabicName: "الطور" },
  { number: 53, name: "An-Najm", arabicName: "النجم" },
  { number: 54, name: "Al-Qamar", arabicName: "القمر" },
  { number: 55, name: "Ar-Rahman", arabicName: "الرحمن" },
  { number: 56, name: "Al-Waqia", arabicName: "الواقعة" },
  { number: 57, name: "Al-Hadid", arabicName: "الحديد" },
  { number: 58, name: "Al-Mujadila", arabicName: "المجادلة" },
  { number: 59, name: "Al-Hashr", arabicName: "الحشر" },
  { number: 60, name: "Al-Mumtahina", arabicName: "الممتحنة" },
  { number: 61, name: "As-Saff", arabicName: "الصف" },
  { number: 62, name: "Al-Jumua", arabicName: "الجمعة" },
  { number: 63, name: "Al-Munafiqoon", arabicName: "المنافقون" },
  { number: 64, name: "At-Taghabun", arabicName: "التغابن" },
  { number: 65, name: "At-Talaq", arabicName: "الطلاق" },
  { number: 66, name: "At-Tahrim", arabicName: "التحريم" },
  { number: 67, name: "Al-Mulk", arabicName: "الملك" },
  { number: 68, name: "Al-Qalam", arabicName: "القلم" },
  { number: 69, name: "Al-Haqqah", arabicName: "الحاقة" },
  { number: 70, name: "Al-Maarij", arabicName: "المعارج" },
  { number: 71, name: "Nuh", arabicName: "نوح" },
  { number: 72, name: "Al-Jinn", arabicName: "الجن" },
  { number: 73, name: "Al-Muzzammil", arabicName: "المزمل" },
  { number: 74, name: "Al-Muddathir", arabicName: "المدثر" },
  { number: 75, name: "Al-Qiyama", arabicName: "القيامة" },
  { number: 76, name: "Al-Insan", arabicName: "الإنسان" },
  { number: 77, name: "Al-Mursalat", arabicName: "المرسلات" },
  { number: 78, name: "An-Naba", arabicName: "النبأ" },
  { number: 79, name: "An-Nazi'at", arabicName: "النازعات" },
  { number: 80, name: "Abasa", arabicName: "عبس" },
  { number: 81, name: "At-Takwir", arabicName: "التكوير" },
  { number: 82, name: "Al-Infitar", arabicName: "الإنفطار" },
  { number: 83, name: "Al-Mutaffifin", arabicName: "المطففين" },
  { number: 84, name: "Al-Inshiqaq", arabicName: "الإنشقاق" },
  { number: 85, name: "Al-Buruj", arabicName: "البروج" },
  { number: 86, name: "At-Tariq", arabicName: "الطارق" },
  { number: 87, name: "Al-Ala", arabicName: "الأعلى" },
  { number: 88, name: "Al-Ghashiyah", arabicName: "الغاشية" },
  { number: 89, name: "Al-Fajr", arabicName: "الفجر" },
  { number: 90, name: "Al-Balad", arabicName: "البلد" },
  { number: 91, name: "Ash-Shams", arabicName: "الشمس" },
  { number: 92, name: "Al-Lail", arabicName: "الليل" },
  { number: 93, name: "Ad-Duhaa", arabicName: "الضحى" },
  { number: 94, name: "Ash-Sharh", arabicName: "الشرح" },
  { number: 95, name: "At-Tin", arabicName: "التين" },
  { number: 96, name: "Al-Alaq", arabicName: "العلق" },
  { number: 97, name: "Al-Qadr", arabicName: "القدر" },
  { number: 98, name: "Al-Bayyina", arabicName: "البينة" },
  { number: 99, name: "Az-Zalzalah", arabicName: "الزلزلة" },
  { number: 100, name: "Al-Adiyat", arabicName: "العاديات" },
  { number: 101, name: "Al-Qariah", arabicName: "القارعة" },
  { number: 102, name: "At-Takathur", arabicName: "التكاثر" },
  { number: 103, name: "Al-Asr", arabicName: "العصر" },
  { number: 104, name: "Al-Humazah", arabicName: "الهمزة" },
  { number: 105, name: "Al-Fil", arabicName: "الفيل" },
  { number: 106, name: "Quraysh", arabicName: "قريش" },
  { number: 107, name: "Al-Ma'un", arabicName: "الماعون" },
  { number: 108, name: "Al-Kawthar", arabicName: "الكوثر" },
  { number: 109, name: "Al-Kafirun", arabicName: "الكافرون" },
  { number: 110, name: "An-Nasr", arabicName: "النصر" },
  { number: 111, name: "Al-Masad", arabicName: "المسد" },
  { number: 112, name: "Al-Ikhlas", arabicName: "الإخلاص" },
  { number: 113, name: "Al-Falaq", arabicName: "الفلق" },
  { number: 114, name: "An-Nas", arabicName: "الناس" },
];

const QuranPlayer = () => {
  const [currentSurah, setCurrentSurah] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
  if (audioRef.current) {
    const surahNumber = surahs[currentSurah].number.toString().padStart(3, '0');
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    audioRef.current.src = `${basePath}/audio/${surahNumber}.mp3`;
    audioRef.current.load();

    if (isPlaying) {
      audioRef.current
        .play()
        .catch((error) => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
    }
  }
  // Add 'isPlaying' to the dependency array
}, [currentSurah, isPlaying]);

  const togglePlay = () => {
  if (!audioRef.current) return; // Null check
  if (isPlaying) {
    audioRef.current.pause();
    trackEvent({
        action: "pause_audio",
        category: "Audio",
        label: surahs[currentSurah].name,
      });
  } else {
    audioRef.current.play();
    trackEvent({
        action: "play_audio",
        category: "Audio",
        label: surahs[currentSurah].name,
      });
  }
  setIsPlaying(!isPlaying);
};

const handleNext = () => {
  if (!audioRef.current) return; // Null check
  if (currentSurah < surahs.length - 1) {
    const wasPlaying = isPlaying;
    if (wasPlaying) {
      audioRef.current.pause();
    }
    setCurrentSurah((prev) => prev + 1);
    trackEvent({
        action: "next_surah",
        category: "Navigation",
        label: surahs[currentSurah + 1].name,
      });
  }
};

const handlePrevious = () => {
  if (!audioRef.current) return; // Null check
  if (currentSurah > 0) {
    const wasPlaying = isPlaying;
    if (wasPlaying) {
      audioRef.current.pause();
    }
    setCurrentSurah((prev) => prev - 1);
    trackEvent({
        action: "previous_surah",
        category: "Navigation",
        label: surahs[currentSurah - 1].name,
      });
  }
};

  const handleTimeUpdate = () => {
    if (!audioRef.current) return; // Null check
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return; // Null check
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (value: [any]) => {
  if (!audioRef.current) return; // Null check
  const [time] = value;
  audioRef.current.currentTime = time;
  setCurrentTime(time);
  trackEvent({
      action: "seek_audio",
      category: "Audio",
      label: surahs[currentSurah].name,
      value: time,
    });
};

const handleVolumeChange = (value: [any]) => {
  if (!audioRef.current) return; // Null check
  const [newVolume] = value;
  setVolume(newVolume);
  audioRef.current.volume = newVolume / 100;
  trackEvent({
      action: "volume_change",
      category: "Audio",
      label: surahs[currentSurah].name,
      value: newVolume,
    });
};

  const toggleMute = () => {
    if (!audioRef.current) return; // Null check
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    trackEvent({
      action: isMuted ? "unmute_audio" : "mute_audio",
      category: "Audio",
      label: surahs[currentSurah].name,
    });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Quran Player with Urdu Translation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Surah Selection */}
        <Select
          value={currentSurah.toString()}
          onValueChange={(value) => {
            const wasPlaying = isPlaying;
            if (wasPlaying) {
              if (!audioRef.current) return; // Null check
              audioRef.current.pause();
            }
            setCurrentSurah(Number(value));
            trackEvent({
              action: "select_surah",
              category: "Navigation",
              label: surahs[Number(value)].name,
            });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Surah" />
          </SelectTrigger>
          <SelectContent>
            {surahs.map((surah, index) => (
              <SelectItem key={surah.number} value={index.toString()}>
                {surah.number}. {surah.name} ({surah.arabicName})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleNext}
        />

        {/* Currently Playing */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">
            {surahs[currentSurah].name}
          </h3>
          <p className="text-2xl font-bold text-primary">
            {surahs[currentSurah].arabicName}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentSurah === 0}
          >
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            onClick={togglePlay}
            className="h-12 w-12 rounded-full"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentSurah === surahs.length - 1}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-4 w-48">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="shrink-0"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuranPlayer;