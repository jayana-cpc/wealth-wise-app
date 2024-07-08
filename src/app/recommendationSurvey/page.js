"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { RecommendationSurvey } from '@/components/RecommendationSurvey/RecommendationSurvey';
export default function RecommendationSurveyPage() {

  return (
    <div>
      <NavBarTemplate>
        <RecommendationSurvey />
      </NavBarTemplate>
    </div>
  );
}
