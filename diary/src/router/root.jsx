import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../page/Loading";

const MainPage = lazy(() => import("../page/MainPage"));
const About = lazy(() => import("../page/AboutPage"));
const ListPage = lazy(() => import("../page/diary/ListPage"));
const ReadPage = lazy(() => import("../page/diary/ReadPage"));
const AddPage = lazy(() => import("../page/diary/AddPage"));
const ModifyPage = lazy(() => import("../page/diary/ModifyPage"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <MainPage />
      </Suspense>
    ),
  },
  {
    path: "/about",
    element: (
      <Suspense fallback={<Loading />}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "/diary/list",
    element: (
      <Suspense fallback={<Loading />}>
        <ListPage />
      </Suspense>
    ),
  },
  {
    path: "/diary/read/:dno",
    element: (
      <Suspense fallback={<Loading />}>
        <ReadPage />
      </Suspense>
    ),
  },
  {
    path: "/diary/add",
    element: (
      <Suspense fallback={<Loading />}>
        <AddPage />
      </Suspense>
    ),
  },
  {
    path: "/diary/modify/:dno",
    element: (
      <Suspense fallback={<Loading />}>
        <ModifyPage />
      </Suspense>
    ),
  },
]);

export default root;
