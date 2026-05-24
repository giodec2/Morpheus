import { useSettingsStore } from '@/stores/settingsStore';

export default function EditorMockup() {
  const { theme } = useSettingsStore();
  const isDark = theme === 'dark';

  const barColor = isDark ? 'bg-slate-700' : 'bg-gray-200';
  const textColor = isDark ? 'bg-slate-600' : 'bg-gray-300';
  const sidebarColor = isDark ? 'bg-slate-800' : 'bg-gray-100';
  const chatColor = isDark ? 'bg-slate-800/50' : 'bg-gray-50';
  const activeItem = isDark ? 'bg-primary-900/30' : 'bg-primary-50';

  return (
    <div className="relative w-full max-w-4xl mx-auto animate-float">
      {/* Browser chrome */}
      <div className={`rounded-xl border shadow-2xl overflow-hidden ${isDark ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-white'}`}>
        {/* Title bar */}
        <div className={`flex items-center gap-2 px-4 py-2.5 border-b ${isDark ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <div className={`flex-1 mx-4 px-3 py-1 rounded-md text-xs text-center ${isDark ? 'bg-slate-700 text-slate-400' : 'bg-white text-gray-400 border border-gray-200'}`}>
            morpheus.app/book/...
          </div>
        </div>

        {/* Editor body */}
        <div className="flex h-[320px] md:h-[400px]">
          {/* Left sidebar */}
          <div className={`w-12 md:w-16 flex-shrink-0 border-r flex flex-col items-center py-3 gap-3 ${isDark ? 'border-slate-700' : 'border-gray-200'} ${sidebarColor}`}>
            <div className={`w-7 h-7 rounded-lg ${activeItem}`} />
            <div className={`w-7 h-7 rounded-lg ${barColor}`} />
            <div className={`w-7 h-7 rounded-lg ${barColor}`} />
            <div className={`w-7 h-7 rounded-lg ${barColor}`} />
          </div>

          {/* Main content */}
          <div className={`flex-1 flex flex-col ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
            {/* Top bar */}
            <div className={`flex items-center gap-3 px-4 py-2 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
              <div className={`w-24 h-4 rounded ${barColor}`} />
              <div className={`w-16 h-4 rounded ${barColor}`} />
              <div className="ml-auto flex gap-2">
                <div className={`w-8 h-4 rounded ${barColor}`} />
                <div className={`w-8 h-4 rounded ${barColor}`} />
              </div>
            </div>

            {/* Editor area */}
            <div className="flex-1 flex">
              <div className="flex-1 p-6 space-y-3 overflow-hidden">
                <div className={`w-3/4 h-5 rounded ${textColor}`} />
                <div className={`w-full h-3 rounded ${textColor}`} />
                <div className={`w-5/6 h-3 rounded ${textColor}`} />
                <div className={`w-full h-3 rounded ${textColor}`} />
                <div className="h-4" />
                <div className={`w-2/3 h-5 rounded ${textColor}`} />
                <div className={`w-full h-3 rounded ${textColor}`} />
                <div className={`w-4/5 h-3 rounded ${textColor}`} />
                <div className={`w-full h-3 rounded ${textColor}`} />
                <div className={`w-3/4 h-3 rounded ${textColor}`} />
                <div className="h-4" />
                <div className={`w-1/2 h-5 rounded ${textColor}`} />
                <div className={`w-full h-3 rounded ${textColor}`} />
                <div className={`w-5/6 h-3 rounded ${textColor}`} />
              </div>

              {/* Right chat panel */}
              <div className={`hidden md:flex w-56 flex-col border-l ${isDark ? 'border-slate-700' : 'border-gray-200'} ${chatColor}`}>
                <div className={`px-3 py-2 border-b text-xs font-medium ${isDark ? 'border-slate-700 text-slate-300' : 'border-gray-200 text-gray-600'}`}>
                  AI Co-Writer
                </div>
                <div className="flex-1 p-3 space-y-3">
                  <div className={`self-end ml-auto w-3/4 h-8 rounded-lg ${isDark ? 'bg-primary-900/30' : 'bg-primary-50'}`} />
                  <div className={`w-full h-16 rounded-lg ${barColor}`} />
                  <div className={`self-end ml-auto w-2/3 h-8 rounded-lg ${isDark ? 'bg-primary-900/30' : 'bg-primary-50'}`} />
                  <div className={`w-full h-12 rounded-lg ${barColor}`} />
                </div>
                <div className={`p-2 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                  <div className={`w-full h-8 rounded-lg ${barColor}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary-500/10 blur-3xl opacity-60" />
    </div>
  );
}
