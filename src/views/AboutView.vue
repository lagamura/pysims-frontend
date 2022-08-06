<template>
  <el-row>
    <el-col :span="16" >
      <h2>About The Project</h2>
      <p>
        The current project is the dissertation work of the student Lagaras Stelios, studying
        e-ce(Eletrical Engineering & Computer Engineering) in
        <a href="https://www.e-ce.uth.gr/">University of Thessaly </a>. My main supervisor is
        <a href="https://www.econ.uth.gr/en/department/staff/faculty/54-dr-yeoryios-stamboulis">
          Prof. Yeoryios Stamboulis
        </a>
      </p>
      <h3><i>Challenge of the Project:</i></h3>
      <p>
        The challenge to create the PySims Platform is to connect the SD (System Dynamics) modeling,
        with the academic community, thus giving the university students and professors the
        necessary tools running different models online, on contrast with the current field of
        dozens of specific softwares.
      </p>
      <p>
        The basis of running the models is a
        <a href="https://pysd.readthedocs.io/en/master/">PySD</a> "a simple library for running
        System Dynamics models in Python, with the purpose of improving integration of Big Data and
        Machine Learning into the SD workflow." The philosophy of PySD, suits in our work, by means
        that is an open-source project and it's vision is to unify a lot of different software tools
        in an open-source engine. Currently, they support vensim and XMILE models, and we could
        easily use some of them from PySD cookbook examples.
      </p>
    </el-col>
  </el-row>
</template>
