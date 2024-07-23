"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { NewsDisplayFind } from '@/components/News/NewsDisplayFind';
export default function Learn() {

  return (
    <div>
      <NavBarTemplate>
        <NewsDisplayFind />
      </NavBarTemplate>
    </div>
  );
}
