import { useMemo, useState } from 'react';
import districtTree from '@/shared/assets/districts_tree.json';

interface DistrictNode {
  name: string;
  fullName: string;
  children: DistrictNode[];
}

export const useAddressSearch = () => {
  const [query, setQuery] = useState<string>('');

  const { fullResults } = useMemo(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return { fullResults: [] };
    }

    const matches: string[] = [];

    const searchTree = (nodes: DistrictNode[]) => {
      nodes.forEach((node) => {
        const formattedFullName = node.fullName.split('-').join(' ');

        const isMatch =
          node.name.includes(trimmedQuery) || formattedFullName.includes(trimmedQuery);

        if (isMatch) {
          matches.push(node.fullName);
        }

        if (node.children && node.children.length > 0) {
          searchTree(node.children);
        }
      });
    };

    searchTree(districtTree as DistrictNode[]);

    return {
      fullResults: matches,
    };
  }, [query]);

  return { query, setQuery, fullResults };
};
