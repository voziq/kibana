/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiNavDrawer,
  EuiShowFor,
  htmlIdGenerator,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import classnames from 'classnames';
import React, { createRef, useState } from 'react';
import { useObservable } from 'react-use';
import { Observable } from 'rxjs';
import { LoadingIndicator } from '../';
import {
  ChromeBadge,
  ChromeBreadcrumb,
  ChromeNavControl,
  ChromeNavLink,
  ChromeRecentlyAccessedHistoryItem,
} from '../..';
import { InternalApplicationStart } from '../../../application/types';
import { HttpStart } from '../../../http';
import { ChromeHelpExtension } from '../../chrome_service';
import { NavType, OnIsLockedUpdate } from './';
import { CollapsibleNav } from './collapsible_nav';
import { HeaderBadge } from './header_badge';
import { HeaderBreadcrumbs } from './header_breadcrumbs';
import { HeaderHelpMenu } from './header_help_menu';
import { HeaderLogo } from './header_logo';
import { HeaderNavControls } from './header_nav_controls';
import { NavDrawer } from './nav_drawer';

export interface HeaderProps {
  kibanaVersion: string;
  application: InternalApplicationStart;
  appTitle$: Observable<string>;
  badge$: Observable<ChromeBadge | undefined>;
  breadcrumbs$: Observable<ChromeBreadcrumb[]>;
  customNavLink$: Observable<ChromeNavLink | undefined>;
  homeHref: string;
  isVisible$: Observable<boolean>;
  kibanaDocLink: string;
  navLinks$: Observable<ChromeNavLink[]>;
  recentlyAccessed$: Observable<ChromeRecentlyAccessedHistoryItem[]>;
  forceAppSwitcherNavigation$: Observable<boolean>;
  helpExtension$: Observable<ChromeHelpExtension | undefined>;
  helpSupportUrl$: Observable<string>;
  legacyMode: boolean;
  navControlsLeft$: Observable<readonly ChromeNavControl[]>;
  navControlsRight$: Observable<readonly ChromeNavControl[]>;
  basePath: HttpStart['basePath'];
  isLocked$: Observable<boolean>;
  navType$: Observable<NavType>;
  loadingCount$: ReturnType<HttpStart['getLoadingCount$']>;
  onIsLockedUpdate: OnIsLockedUpdate;
}

function renderMenuTrigger(toggleOpen: () => void) {
  return (
    <EuiHeaderSectionItemButton
      aria-label={i18n.translate('core.ui.chrome.headerGlobalNav.toggleSideNavAriaLabel', {
        defaultMessage: 'Toggle side navigation',
      })}
      onClick={toggleOpen}
    >
      <EuiIcon type="apps" size="m" />
    </EuiHeaderSectionItemButton>
  );
}

export function Header({
  kibanaVersion,
  kibanaDocLink,
  legacyMode,
  application,
  basePath,
  onIsLockedUpdate,
  homeHref,
  ...observables
}: HeaderProps) {
  const isVisible = useObservable(observables.isVisible$, true);
  const navType = useObservable(observables.navType$, 'modern');
  const isLocked = useObservable(observables.isLocked$, false);
  const [isOpen, setIsOpen] = useState(false);

  if (!isVisible) {
    return <LoadingIndicator loadingCount$={observables.loadingCount$} />;
  }

  const navDrawerRef = createRef<EuiNavDrawer>();
  const toggleCollapsibleNavRef = createRef<HTMLButtonElement>();
  const navId = htmlIdGenerator()();
  const className = classnames(
    'chrHeaderWrapper', // TODO #64541 - delete this
    'hide-for-sharing',
    {
      'chrHeaderWrapper--navIsLocked': isLocked,
      headerWrapper: navType === 'modern',
    }
  );

  return (
    <>
      <LoadingIndicator loadingCount$={observables.loadingCount$} />

    </>
  );
}
