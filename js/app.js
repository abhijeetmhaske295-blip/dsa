/**
 * DSA Digital Manual Application Logic
 */

(function () {
  'use strict';

  // Global state
  const state = {
    problems: (typeof PROBLEMS_DATA !== 'undefined' ? PROBLEMS_DATA : []),
    currentId: 'Q1',
    currentFilter: 'all', // 'all', 'Part A', 'Part B'
    searchQuery: ''
  };

  // DOM Elements
  const elements = {
    problemList: document.getElementById('problemList'),
    resultsCount: document.getElementById('resultsCount'),
    conceptSearchBar: document.getElementById('conceptSearchBar'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    filterAll: document.getElementById('filterAll'),
    filterPartA: document.getElementById('filterPartA'),
    filterPartB: document.getElementById('filterPartB'),
    mobileSidebarToggle: document.getElementById('mobileSidebarToggle'),
    mobileSidebarOverlay: document.getElementById('mobileSidebarOverlay'),
    sidebar: document.getElementById('sidebar'),
    prevProblemBtn: document.getElementById('prevProblemBtn'),
    nextProblemBtn: document.getElementById('nextProblemBtn'),
    viewPartBadge: document.getElementById('viewPartBadge'),
    viewIdBadge: document.getElementById('viewIdBadge'),
    viewTopicShort: document.getElementById('viewTopicShort'),
    badgeQuestionId: document.getElementById('badgeQuestionId'),
    badgeLanguage: document.getElementById('badgeLanguage'),
    badgeDifficulty: document.getElementById('badgeDifficulty'),
    badgeTopic: document.getElementById('badgeTopic'),
    badgeSourceFile: document.getElementById('badgeSourceFile'),
    viewTitle: document.getElementById('viewTitle'),
    overviewTopic: document.getElementById('overviewTopic'),
    overviewConcepts: document.getElementById('overviewConcepts'),
    overviewTimeComplexity: document.getElementById('overviewTimeComplexity'),
    overviewSpaceComplexity: document.getElementById('overviewSpaceComplexity'),
    overviewDifficulty: document.getElementById('overviewDifficulty'),
    overviewPart: document.getElementById('overviewPart'),
    overviewNotes: document.getElementById('overviewNotes'),
    viewStatement: document.getElementById('viewStatement'),
    viewSampleInput: document.getElementById('viewSampleInput'),
    viewSampleOutput: document.getElementById('viewSampleOutput'),
    codeFileName: document.getElementById('codeFileName'),
    codeLangTag: document.getElementById('codeLangTag'),
    copyCodeBtn: document.getElementById('copyCodeBtn'),
    copyBtnText: document.getElementById('copyBtnText'),
    codeBlock: document.getElementById('codeBlock'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
  };

  /**
   * Filter problems based on active part filter and search query
   */
  function getFilteredProblems() {
    return state.problems.filter(problem => {
      // Part filter
      if (state.currentFilter !== 'all' && problem.part !== state.currentFilter) {
        return false;
      }

      // Search query filter: check each word / stem in the query
      if (state.searchQuery.trim() !== '') {
        const query = state.searchQuery.toLowerCase().trim();
        // Support searching singular/plural forms like "stacks" -> "stack" or terms in query
        const queryTerms = query.split(/\s+/).filter(Boolean);
        const searchableText = [
          problem.id,
          problem.title,
          problem.topic,
          problem.notes || '',
          problem.file,
          problem.statement,
          ...problem.keyConcepts
        ].join(' ').toLowerCase();

        // Check if full query matches, or if all significant terms match
        const fullMatch = searchableText.includes(query);
        const allTermsMatch = queryTerms.every(term => {
          // Normalize plural 's' at the end of words > 3 chars
          const stem = term.length > 3 && term.endsWith('s') ? term.slice(0, -1) : term;
          return searchableText.includes(term) || searchableText.includes(stem);
        });

        if (!fullMatch && !allTermsMatch) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Render the sidebar problem list items
   */
  function renderSidebar() {
    const filtered = getFilteredProblems();
    elements.problemList.innerHTML = '';

    elements.resultsCount.textContent = `Showing ${filtered.length} of ${state.problems.length} problems`;

    if (filtered.length === 0) {
      elements.problemList.innerHTML = `
        <div class="py-8 text-center text-slate-400">
          <svg class="w-8 h-8 mx-auto text-slate-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-sm font-medium">No matching problems</p>
          <p class="text-xs text-slate-500 mt-1">Try searching for concepts like "trees", "sorting", or "stack"</p>
        </div>
      `;
      return;
    }

    filtered.forEach(problem => {
      const isSelected = problem.id === state.currentId;
      const itemBtn = document.createElement('button');
      itemBtn.type = 'button';
      itemBtn.setAttribute('data-id', problem.id);
      itemBtn.className = `w-full text-left p-2.5 rounded-lg transition group flex flex-col gap-1 ${
        isSelected
          ? 'bg-indigo-600/20 border border-indigo-500/50 text-white shadow-sm'
          : 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
      }`;

      // Language pill colors
      const isCpp = problem.language === 'cpp';
      const langBadgeClass = isCpp
        ? 'bg-sky-950/80 text-sky-400 border border-sky-800/60'
        : 'bg-amber-950/80 text-amber-400 border border-amber-800/60';

      // Difficulty colors
      let diffClass = 'text-emerald-400';
      if (problem.difficulty === 'Medium') diffClass = 'text-amber-400';
      if (problem.difficulty === 'Hard') diffClass = 'text-rose-400';

      itemBtn.innerHTML = `
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-mono font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}">${problem.id}</span>
            <span class="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${langBadgeClass}">${isCpp ? 'C++' : 'Python'}</span>
          </div>
          <span class="text-[10px] font-semibold ${diffClass}">${problem.difficulty}</span>
        </div>
        <div class="text-xs font-medium text-slate-200 truncate w-full ${isSelected ? 'text-indigo-200 font-semibold' : 'group-hover:text-white'}">
          ${problem.title}
        </div>
        <div class="text-[11px] text-slate-400 truncate flex items-center gap-1">
          <span class="text-slate-500">${problem.topic}</span>
        </div>
      `;

      itemBtn.addEventListener('click', () => {
        selectProblem(problem.id);
        // On mobile, close sidebar after clicking
        if (window.innerWidth < 768) {
          closeMobileSidebar();
        }
      });

      elements.problemList.appendChild(itemBtn);
    });
  }

  /**
   * Display the selected problem details in the main view
   */
  function displayProblem(problem) {
    if (!problem) return;

    // Header & breadcrumbs
    elements.viewPartBadge.textContent = problem.part;
    elements.viewIdBadge.textContent = problem.id;
    elements.viewTopicShort.textContent = problem.topic.split('&')[0].trim();

    elements.badgeQuestionId.textContent = problem.id;
    elements.badgeLanguage.textContent = problem.language === 'cpp' ? 'C++ (Part A)' : 'Python (Part B)';
    elements.badgeLanguage.className = `text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide ${
      problem.language === 'cpp'
        ? 'bg-sky-950 text-sky-400 border border-sky-800/80'
        : 'bg-amber-950 text-amber-400 border border-amber-800/80'
    }`;

    // Difficulty badge
    elements.badgeDifficulty.textContent = problem.difficulty;
    let diffClass = 'bg-emerald-950 text-emerald-400 border-emerald-800/80';
    if (problem.difficulty === 'Medium') diffClass = 'bg-amber-950 text-amber-400 border-amber-800/80';
    if (problem.difficulty === 'Hard') diffClass = 'bg-rose-950 text-rose-400 border-rose-800/80';
    elements.badgeDifficulty.className = `text-xs font-semibold px-2.5 py-1 rounded-md border ${diffClass}`;

    elements.badgeTopic.textContent = problem.topic;
    elements.badgeSourceFile.textContent = problem.file;
    elements.viewTitle.textContent = problem.title;

    // Study Overview
    elements.overviewTopic.textContent = problem.topic;
    elements.overviewTimeComplexity.textContent = problem.timeComplexity;
    elements.overviewSpaceComplexity.textContent = `Space: ${problem.spaceComplexity}`;
    elements.overviewDifficulty.textContent = problem.difficulty;
    elements.overviewDifficulty.className = `text-sm font-bold ${
      problem.difficulty === 'Hard' ? 'text-rose-400' : (problem.difficulty === 'Medium' ? 'text-amber-400' : 'text-emerald-400')
    }`;
    elements.overviewPart.textContent = `${problem.part} (${problem.language === 'cpp' ? 'C++' : 'Python'})`;
    elements.overviewNotes.textContent = problem.notes || '';

    // Key concepts chips
    elements.overviewConcepts.innerHTML = '';
    problem.keyConcepts.forEach(concept => {
      const chip = document.createElement('span');
      chip.className = 'text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60 font-medium hover:border-indigo-500/50 transition cursor-pointer';
      chip.textContent = concept;
      chip.title = `Search for "${concept}"`;
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.conceptSearchBar.value = concept;
        handleSearch(concept);
      });
      elements.overviewConcepts.appendChild(chip);
    });

    // Exact Problem Statement
    elements.viewStatement.textContent = problem.statement;
    elements.viewSampleInput.textContent = problem.sampleInput || 'N/A';
    elements.viewSampleOutput.textContent = problem.sampleOutput || 'N/A';

    // Code viewer
    elements.codeFileName.textContent = problem.file;
    elements.codeLangTag.textContent = problem.language === 'cpp' ? 'C++' : 'Python';

    // Set code syntax highlighting class
    const prismLangClass = problem.language === 'cpp' ? 'language-cpp' : 'language-python';
    elements.codeBlock.className = prismLangClass;
    elements.codeBlock.textContent = problem.code;

    // Re-run Prism highlighting
    if (window.Prism) {
      Prism.highlightElement(elements.codeBlock);
    }

    // Update Prev / Next buttons
    const currentIndex = state.problems.findIndex(p => p.id === problem.id);
    elements.prevProblemBtn.disabled = currentIndex <= 0;
    elements.nextProblemBtn.disabled = currentIndex >= state.problems.length - 1;

    // Scroll main content to top
    const mainContainer = document.getElementById('mainContent');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * Select a problem by ID
   */
  function selectProblem(id) {
    const target = state.problems.find(p => p.id === id);
    if (!target) return;

    state.currentId = id;
    displayProblem(target);
    renderSidebar();

    // Scroll active item into view in sidebar
    const activeItem = elements.problemList.querySelector(`[data-id="${id}"]`);
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  /**
   * Search handling
   */
  function handleSearch(query) {
    state.searchQuery = query;
    if (query.trim() !== '') {
      elements.clearSearchBtn.classList.remove('hidden');
    } else {
      elements.clearSearchBtn.classList.add('hidden');
    }

    renderSidebar();

    // If current selected problem is not in filtered list, select first available
    const filtered = getFilteredProblems();
    if (filtered.length > 0 && !filtered.some(p => p.id === state.currentId)) {
      selectProblem(filtered[0].id);
    }
  }

  /**
   * Toast notification
   */
  let toastTimeout = null;
  function showToast(message) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.remove('translate-y-20', 'opacity-0');
    elements.toast.classList.add('translate-y-0', 'opacity-100');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      elements.toast.classList.remove('translate-y-0', 'opacity-100');
      elements.toast.classList.add('translate-y-20', 'opacity-0');
    }, 2400);
  }

  /**
   * Copy to clipboard action
   */
  function copyCodeToClipboard() {
    const currentProblem = state.problems.find(p => p.id === state.currentId);
    if (!currentProblem || !currentProblem.code) return;

    navigator.clipboard.writeText(currentProblem.code).then(() => {
      const originalText = elements.copyBtnText.textContent;
      elements.copyBtnText.textContent = 'Copied!';
      showToast('Code copied to clipboard!');

      setTimeout(() => {
        elements.copyBtnText.textContent = originalText;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = currentProblem.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      elements.copyBtnText.textContent = 'Copied!';
      showToast('Code copied to clipboard!');
      setTimeout(() => {
        elements.copyBtnText.textContent = 'Copy to Clipboard';
      }, 2000);
    });
  }

  /**
   * Mobile sidebar controls
   */
  function openMobileSidebar() {
    elements.sidebar.classList.remove('-translate-x-full');
    elements.mobileSidebarOverlay.classList.remove('hidden');
  }

  function closeMobileSidebar() {
    elements.sidebar.classList.add('-translate-x-full');
    elements.mobileSidebarOverlay.classList.add('hidden');
  }

  /**
   * Set active filter tab style
   */
  function setFilterTab(tabName) {
    state.currentFilter = tabName;
    const tabs = [
      { el: elements.filterAll, name: 'all' },
      { el: elements.filterPartA, name: 'Part A' },
      { el: elements.filterPartB, name: 'Part B' }
    ];

    tabs.forEach(t => {
      if (t.name === tabName) {
        t.el.className = 'filter-tab active py-1.5 px-2 rounded-md bg-indigo-600 text-white text-center transition font-semibold';
      } else {
        t.el.className = 'filter-tab py-1.5 px-2 rounded-md text-slate-400 hover:text-slate-200 text-center transition font-medium';
      }
    });

    renderSidebar();

    const filtered = getFilteredProblems();
    if (filtered.length > 0 && !filtered.some(p => p.id === state.currentId)) {
      selectProblem(filtered[0].id);
    }
  }

  /**
   * Event Listeners setup
   */
  function initEventListeners() {
    // Search input
    elements.conceptSearchBar.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });

    elements.clearSearchBtn.addEventListener('click', () => {
      elements.conceptSearchBar.value = '';
      handleSearch('');
      elements.conceptSearchBar.focus();
    });

    // Quick tag chips in header
    document.querySelectorAll('.quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const tag = chip.getAttribute('data-tag');
        elements.conceptSearchBar.value = tag;
        handleSearch(tag);
      });
    });

    // Filter tabs
    elements.filterAll.addEventListener('click', () => setFilterTab('all'));
    elements.filterPartA.addEventListener('click', () => setFilterTab('Part A'));
    elements.filterPartB.addEventListener('click', () => setFilterTab('Part B'));

    // Copy code button
    elements.copyCodeBtn.addEventListener('click', copyCodeToClipboard);

    // Prev / Next Problem buttons
    elements.prevProblemBtn.addEventListener('click', () => {
      const idx = state.problems.findIndex(p => p.id === state.currentId);
      if (idx > 0) {
        selectProblem(state.problems[idx - 1].id);
      }
    });

    elements.nextProblemBtn.addEventListener('click', () => {
      const idx = state.problems.findIndex(p => p.id === state.currentId);
      if (idx < state.problems.length - 1) {
        selectProblem(state.problems[idx + 1].id);
      }
    });

    // Mobile sidebar toggle
    elements.mobileSidebarToggle.addEventListener('click', openMobileSidebar);
    elements.mobileSidebarOverlay.addEventListener('click', closeMobileSidebar);

    // Keyboard navigation (Alt+ArrowLeft, Alt+ArrowRight, or / for search)
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        elements.conceptSearchBar.focus();
      }
    });
  }

  /**
   * App initialization
   */
  function init() {
    initEventListeners();
    renderSidebar();
    selectProblem(state.currentId);
  }

  // Run on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
