import { RxDB, type TeamDocument } from "$lib/database/app.database";
import type { Observable } from "rxjs";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class TeamRepository {
  constructor() {}
  /**
   * extracts RxDocument of Team.
   */
  public getDocument = (elem: TeamDocument) => {
    return elem.toMutableJSON();
  };

  /**
   * get all teams observable of user
   */
  public getTeams = (): Observable<TeamDocument[]> => {
    return RxDB.getInstance().rxdb.team.find().$;
  };

  /**
   * clear teams data
   */
  public clearTeams = async (): Promise<any> => {
    return RxDB.getInstance().rxdb.team.find().remove();
  };

  /**
   * Sets a team as active
   */
  public setActiveTeamWorkspace = async (
    teamId: string,
    workspaceId: string,
  ): Promise<void> => {
    const teams: TeamDocument[] = await RxDB.getInstance()
      .rxdb.team.find()
      .exec();
    const data = teams.map((elem: TeamDocument) => {
      const res = this.getDocument(elem);
      const workspaces = res.workspaces.map((workspace: any) => {
        if (workspace?.workspaceId == workspaceId)
          workspace.isActiveWorkspace = true;
        else workspace.isActiveWorkspace = false;
        return workspace;
      });
      if (res.teamId == teamId)
        (res.isActiveTeam = true), (res.workspaces = workspaces);
      else (res.isActiveTeam = false), (res.workspaces = workspaces);
      return res;
    });
    await RxDB.getInstance().rxdb.team.bulkUpsert(data);
    return;
  };

  /**
   * sync / refresh teams data
   */
  public bulkInsertData = async (data: any): Promise<void> => {
    await this.clearTeams();

    await RxDB.getInstance().rxdb.team.bulkInsert(data);
    return;
  };

  /**
   * get active team
   */
  public getActiveTeam = (): Observable<TeamDocument> => {
    return RxDB.getInstance().rxdb.team.findOne({
      selector: {
        isActiveTeam: true,
      },
    }).$;
  };

  /**
   * Create a new team
   */
  public createTeam = async (team: any): Promise<void> => {
    await RxDB.getInstance().rxdb.team.insert(team);
    return;
  };

  /**
   * Update a team
   */

  public modifyTeam = async (teamId: string, data) => {
    const team = await RxDB.getInstance()
      .rxdb.team.findOne({
        selector: {
          teamId: teamId,
        },
      })
      .exec();
    team.incrementalModify((value) => {
      if (data.name) value.name = data.name;
      if (data.workspaces) value.workspaces = data.workspaces;
      if (data.logo) value.logo = data.logo;
      if (data.users) value.users = data.users;
      if (data.owner) value.owner = data.owner;
      if (data.admins) value.admins = data.admins;
      if (data.isActiveTeam) value.isActiveTeam = data.isActiveTeam;
      if (data.createdAt) value.createdAt = data.createdAt;
      if (data.updatedAt) value.updatedAt = data.updatedAt;
      if (data.updatedBy) value.updatedBy = data.updatedBy;
      if (data.createdBy) value.createdBy = data.createdBy;
      // if (data.description) value.description = data.description;
      return value;
    });
  };
}
