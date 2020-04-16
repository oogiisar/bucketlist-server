module.exports = {
    PORT: process.env.PORT || 8000,
    //DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin@localhost/bucketlist', 
    DATABASE_URL: 'postgres://myrwrpvhqxsaig:832f48824b209ae4724b73ba6793f1ed43c65797709a910a529ed90bc155bd81@ec2-34-197-212-240.compute-1.amazonaws.com:5432/dcn1qf1711778r',
    NODE_ENV: process.env.NODE_ENV || 'development',
  }
