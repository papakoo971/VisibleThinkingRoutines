import Link from "next/link";
import { Rows3, SquarePen } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { ActivitySetupForm } from "./activity-setup-form";

const activityTemplates = [
  {
    id: "see-think-wonder",
    title: "See-Think-Wonder 활동",
    routine: "See-Think-Wonder",
    description: "관찰한 것, 생각한 것, 궁금한 것을 나누어 쓰는 개인 사고 루틴입니다.",
    defaultTitle: "사진 속 도시의 변화 관찰하기",
    guide: "자료를 자세히 관찰한 뒤, 실제로 보이는 것과 그로부터 생각한 것, 더 궁금해진 것을 카드로 나누어 작성하세요.",
  },
  {
    id: "frayer-model",
    title: "프레이어 모델",
    routine: "프레이어 모델",
    description: "개념의 정의, 특징, 예, 반례를 정리해 이해를 점검합니다.",
    defaultTitle: "생태계 핵심 개념 정리하기",
    guide: "중심 개념을 읽고 정의, 특징, 예시, 예시가 아닌 것을 각각 작성하세요.",
  },
  {
    id: "claim-support-question",
    title: "Claim-Support-Question",
    routine: "Claim-Support-Question",
    description: "주장, 근거, 더 확인할 질문을 연결해 자료 해석을 확장합니다.",
    defaultTitle: "과학 기사 읽고 주장 근거 찾기",
    guide: "자료를 읽고 자신의 주장, 그 주장을 뒷받침하는 근거, 더 확인하고 싶은 질문을 작성하세요.",
  },
];

export default async function NewActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const { template } = await searchParams;
  const selectedTemplate = activityTemplates.find((item) => item.id === template);

  return (
    <AppShell>
      <PageHeader
        eyebrow="활동 만들기"
        title={selectedTemplate ? `${selectedTemplate.title} 만들기` : "활동 템플릿 선택"}
        description={
          selectedTemplate
            ? "이미지 또는 PDF 중심 자료 1개와 안내 텍스트를 기준으로 활동을 생성합니다."
            : "먼저 수업에 맞는 사고 루틴을 선택한 뒤 활동 정보를 입력합니다."
        }
      />

      {!selectedTemplate ? (
        <section className="grid gap-4 md:grid-cols-3">
          {activityTemplates.map((item) => (
            <Link
              href={`/teacher/activities/new?template=${item.id}`}
              key={item.id}
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm hover:border-emerald-300 hover:bg-emerald-50/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-800">
                {item.id === "frayer-model" ? <Rows3 className="h-5 w-5" /> : <SquarePen className="h-5 w-5" />}
              </div>
              <h2 className="mt-4 font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{item.description}</p>
              <p className="mt-4 text-sm font-semibold text-emerald-800">선택하기</p>
            </Link>
          ))}
        </section>
      ) : (
        <ActivitySetupForm selectedTemplate={selectedTemplate} />
      )}
    </AppShell>
  );
}
