import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Arrow } from './Arrow';

vi.mock('@/assets/Arrow.svg?react', () => ({
  __esModule: true,
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

describe('Arrow component', () => {
  it('should render the arrow with the correct direction class', () => {
    const { container: upContainer } = render(<Arrow direction="up" />);

    expect(upContainer.querySelector('svg')?.classList);
  });
});
