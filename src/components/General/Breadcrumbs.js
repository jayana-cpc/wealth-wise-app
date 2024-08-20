"use client";

import {
  Breadcrumbs as MantineBreadcrumbs,
  Anchor,
  Space,
  Button,
  Group,
  Alert,
} from "@mantine/core";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconChevronRight, IconChevronLeft, IconInfoCircle } from "@tabler/icons-react";

const capitalizeWords = (str) => {
  return str
    .replace(/-/g, " ")
    .replace(/(\d+)/g, " $1")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const Breadcrumbs = ({ prevRoute, nextRoute }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return (
      <Anchor
        key={href}
        href={href}
        passHref
        component="a"
        style={{ color: "grey", textDecoration: "none" }}
      >
        {capitalizeWords(segment)}
      </Anchor>
    );
  });

  const handlePrevClick = () => {
    if (prevRoute) {
      router.push(prevRoute);
    }
  };

  const handleNextClick = () => {
    if (!nextRoute) return;

    // Check if userStock is defined in localStorage
    const userStock = localStorage.getItem("userStock");

    if (!userStock) {
      setShowAlert(true); // Show the alert
      return;
    }

    router.push(nextRoute);
  };

  return (
    <div>
      <Space h="sm" />

      {showAlert && (
        <Alert
          variant="filled"
          color="red"
          title="Attention"
          icon={<IconInfoCircle />}
          withCloseButton
          onClose={() => setShowAlert(false)} 
        >
          Please choose a company before proceeding.
        </Alert>
      )}

      <Group position="apart" spacing="xl">
        <Button
          onClick={handlePrevClick}
          leftSection={<IconChevronLeft />}
          style={{
            backgroundColor: "#242424",
            "&:hover": {
              backgroundColor: "#3a3a3a",
            },
          }}
          disabled={!prevRoute}
        >
          Prev
        </Button>
        <MantineBreadcrumbs
          separator={<IconChevronRight size={16} color="white" />}
        >
          <Anchor
            href="/"
            passHref
            component="a"
            style={{ color: "grey", textDecoration: "none" }}
          >
            Home
          </Anchor>
          {breadcrumbItems}
        </MantineBreadcrumbs>
        <Button
          onClick={handleNextClick}
          rightSection={<IconChevronRight />}
          style={{
            backgroundColor: "#242424",
            "&:hover": {
              backgroundColor: "#3a3a3a",
            },
          }}
          disabled={!nextRoute}
        >
          Next
        </Button>
      </Group>
    </div>
  );
};

export default Breadcrumbs;
