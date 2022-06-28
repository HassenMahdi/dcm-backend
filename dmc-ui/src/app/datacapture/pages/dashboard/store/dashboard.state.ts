import { AppState } from '@app/core';
import { createFeatureSelector } from '@ngrx/store';
import { Dashboard } from './model/dashboard.model';

export const FEATURE_NAME = 'dashboard';
export const selectDashboard = createFeatureSelector<State, Dashboard>(
  FEATURE_NAME
);

export interface State extends AppState {
  dashboard: Dashboard;
}
