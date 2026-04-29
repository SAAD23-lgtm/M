import { Search, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Input } from './ui/input';

export type CatalogToolbarGroup = {
  id: string;
  labelAr: string;
  labelEn: string;
  count?: number;
};

export type CatalogToolbarFilter = CatalogToolbarGroup;

interface CatalogMobileToolbarProps {
  isRTL: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  onClearQuery: () => void;
  groups: CatalogToolbarGroup[];
  activeGroupId?: string;
  onGroupSelect: (groupId: string) => void;
  filters?: CatalogToolbarFilter[];
  activeFilterId?: string;
  onFilterSelect?: (filterId: string) => void;
  filtersLabel?: string;
  helperText: string;
  countPill: string;
  searchPlaceholder: string;
  className?: string;
}

export default function CatalogMobileToolbar({
  isRTL,
  query,
  onQueryChange,
  onClearQuery,
  groups,
  activeGroupId,
  onGroupSelect,
  filters,
  activeFilterId,
  onFilterSelect,
  filtersLabel,
  helperText,
  countPill,
  searchPlaceholder,
  className,
}: CatalogMobileToolbarProps) {
  const hasFilters = Boolean(filters?.length && onFilterSelect);

  return (
    <div
      className={cn(
        'sticky top-20 z-30 -mx-4 mb-5 bg-[linear-gradient(180deg,rgba(240,249,255,0.96),rgba(240,249,255,0.72),rgba(240,249,255,0))] px-4 py-3 sm:hidden',
        className,
      )}
    >
      <div className="rounded-[1.7rem] border border-white/70 bg-white/92 p-3 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-xl">
        <div className="flex items-center gap-2 rounded-[1.2rem] border border-slate-200 bg-slate-50/80 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.88)]">
          <Search className="h-4 w-4 flex-shrink-0 text-slate-400" />
          <Input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-auto border-0 bg-transparent px-0 py-0 text-sm text-slate-700 shadow-none focus-visible:ring-0"
            aria-label={searchPlaceholder}
          />
          {query ? (
            <button
              type="button"
              onClick={onClearQuery}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white hover:text-slate-700"
              aria-label={isRTL ? 'مسح البحث' : 'Clear search'}
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold text-slate-500">
            {helperText}
          </p>
          <span className="rounded-full bg-[#153b66]/8 px-3 py-1 text-[11px] font-bold text-[#153b66]">
            {countPill}
          </span>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {groups.map((group) => {
            const isActive = group.id === activeGroupId;

            return (
              <button
                key={group.id}
                type="button"
                onClick={() => onGroupSelect(group.id)}
                className={cn(
                  'inline-flex flex-shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors',
                  isActive
                    ? 'border-[#153b66] bg-[#153b66] text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-[#153b66] hover:text-[#153b66]',
                )}
              >
                <span>{isRTL ? group.labelAr : group.labelEn}</span>
                {typeof group.count === 'number' ? (
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                      isActive ? 'bg-white/18 text-white' : 'bg-slate-100 text-slate-500',
                    )}
                  >
                    {group.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {hasFilters ? (
          <div className="mt-3 border-t border-slate-100 pt-3">
            {filtersLabel ? (
              <p className="mb-2 text-[11px] font-semibold text-slate-500">
                {filtersLabel}
              </p>
            ) : null}

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {filters?.map((filter) => {
                const isActive = filter.id === activeFilterId;

                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => onFilterSelect?.(filter.id)}
                    className={cn(
                      'inline-flex flex-shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors',
                      isActive
                        ? 'border-sky-200 bg-sky-100 text-sky-800'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700',
                    )}
                  >
                    <span>{isRTL ? filter.labelAr : filter.labelEn}</span>
                    {typeof filter.count === 'number' ? (
                      <span
                        className={cn(
                          'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                          isActive ? 'bg-white/70 text-sky-800' : 'bg-slate-100 text-slate-500',
                        )}
                      >
                        {filter.count}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
