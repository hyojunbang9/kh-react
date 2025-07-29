import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../page/Loading";

const MainPage = lazy(() => import("../page/MainPage"));
const About = lazy(() => import("../page/AboutPage"));

const ListPage = lazy(() => import("../page/diary/ListPage"));
const ReadPage = lazy(() => import("../page/diary/ReadPage"));
const AddPage = lazy(() => import("../page/diary/AddPage"));
const ModifyPage = lazy(() => import("../page/diary/ModifyPage"));

const MomentListPage = lazy(() => import("../page/moment/ListPage"));
const MomentAddPage = lazy(() => import("../page/moment/AddPage"));
const MomentReadPage = lazy(() => import("../page/moment/ReadPage"));
const MomentModifyPage = lazy(() => import("../page/moment/ModifyPage"));

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
  // diary =====================================
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
  // moment =====================================
  {
    path: "/moment/list",
    element: (
      <Suspense fallback={<Loading />}>
        <MomentListPage />
      </Suspense>
    ),
  },
  {
    path: "/moment/add",
    element: (
      <Suspense fallback={<Loading />}>
        <MomentAddPage />
      </Suspense>
    ),
  },
  {
    path: "/moment/read/:pno",
    element: (
      <Suspense fallback={<Loading />}>
        <MomentReadPage />
      </Suspense>
    ),
  },
  {
    path: "/moment/modify/:pno",
    element: (
      <Suspense fallback={<Loading />}>
        <MomentModifyPage />
      </Suspense>
    ),
  },
]);

export default root;
