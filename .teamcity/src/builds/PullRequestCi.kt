package builds

import jetbrains.buildServer.configs.kotlin.v2019_2.AbsoluteId
import jetbrains.buildServer.configs.kotlin.v2019_2.BuildType
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.PullRequests
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.commitStatusPublisher
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.pullRequests
import vcs.Kibana

object PullRequestCi : BuildType({
  id = AbsoluteId("Kibana_PullRequest_CI")
  name = "Pull Request CI"
  type = Type.COMPOSITE
  paused = true

  // TODO add fork user and maybe branch name to build number
  // buildNumberPattern = "%build.counter%-"

  vcs {
    root(Kibana)
    checkoutDir = "kibana"

    branchFilter = "+:pull/*"
  }

  features {
    pullRequests {
      vcsRootExtId = "${Kibana.id}"
      provider = github {
        authType = token {
          token = "credentialsJSON:07d22002-12de-4627-91c3-672bdb23b55b"
        }
        filterTargetBranch = "refs/heads/master_teamcity"
        filterAuthorRole = PullRequests.GitHubRoleFilter.MEMBER
      }
    }
    commitStatusPublisher {
      vcsRootExtId = "${Kibana.id}"
      publisher = github {
        githubUrl = "https://api.github.com"
        authType = personalToken {
          token = "credentialsJSON:07d22002-12de-4627-91c3-672bdb23b55b"
        }
      }
    }
  }
})
